import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navigation from "../navigation/navigation";
import styles from "./Chat.module.css";
import { MessageCircle, Send, Paperclip, User } from 'lucide-react';
import Footer from "../footer/footer";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [sender, setSender] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const getSenderEmail = () => {
      const organizer = localStorage.getItem("organizer");
      const email = JSON.parse(organizer)?.email || "";
      return email;
    };
    setSender(getSenderEmail());
  }, []);

  useEffect(() => {
    if (sender) {
      fetchClients();
    }
  }, [sender]);

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      if (selectedClient && newMessage.sender === selectedClient.email) {
        setMessages((prev) => [...prev, newMessage]);
      }

      if (!clients.some(client => client.email === newMessage.sender)) {
        setClients(prevClients => [...prevClients, {
          email: newMessage.sender,
          name: newMessage.sender.split("@")[0]
        }]);
      }
    });

    return () => socket.off("newMessage");
  }, [selectedClient, clients]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat/clients?sender=${sender}`);
      const clientData = response.data.map(email => ({
        email,
        name: email.split("@")[0]
      }));
      setClients(clientData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchMessages = async (client) => {
    try {
      setSelectedClient(client);
      const response = await axios.get(
        `http://localhost:5000/api/chat/getMessages?sender=${sender}&recipient=${client.email}`
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (content, type = "text") => {
    if (!content.trim() || !selectedClient) return;
  
    const messageData = {
      sender,
      recipient: selectedClient.email,
      content,
      type,
      fileUrl: type === "file" ? content : null,
    };
  
    try {
      await axios.post("http://localhost:5000/api/chat/sendMessage", messageData);
      socket.emit("sendMessage", messageData);
      if (type === "text") setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/chat/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.file.fileUrl) {
        sendMessage(response.data.file.fileUrl, "file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const startNewChat = () => {
    if (!newEmail.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    const existingChat = clients.find(client => client.email === newEmail);
    if (existingChat) {
      setSelectedClient(existingChat);
      fetchMessages(existingChat);
    } else {
      const newChat = { email: newEmail, name: newEmail.split("@")[0] };
      setClients(prevClients => {
        const updatedClients = [...prevClients, newChat];
        setSelectedClient(newChat);
        fetchMessages(newChat);
        return updatedClients;
      });
    }

    setNewEmail("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(message);
    }
  };

  return (
    <div>
    <div className={styles.chatWrapper}>
      <Navigation />
      
      <div className={styles.chatContainer}>
        <div className={styles.chatList}>
          <div className={styles.chatListHeader}>
            <MessageCircle size={24} />
            <h2>Messages</h2>
          </div>

          <div className={styles.newChatSection}>
            <input
              type="email"
              placeholder="Start new chat (enter email)"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={styles.newChatInput}
            />
            <button onClick={startNewChat} className={styles.newChatButton}>
              Start
            </button>
          </div>

          <div className={styles.clientsList}>
            {clients.map((client) => (
              <div
                key={client.email}
                className={`${styles.clientItem} ${
                  selectedClient?.email === client.email ? styles.active : ""
                }`}
                onClick={() => fetchMessages(client)}
              >
                <div className={styles.clientAvatar}>
                  <User size={24} />
                </div>
                <div className={styles.clientInfo}>
                  <span className={styles.clientName}>{client.name}</span>
                  <span className={styles.clientEmail}>{client.email}</span>
                </div>
              </div>
            ))}
            {clients.length === 0 && (
              <div className={styles.noClients}>
                <p>No conversations yet</p>
                <p>Start a new chat above!</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.chatArea}>
          {selectedClient ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                  <h2>{selectedClient.name}</h2>
                  <span>{selectedClient.email}</span>
                </div>
              </div>

              <div className={styles.messageContainer}>
                {messages.map((msg, index) => (
                  <div
                    key={msg._id || `${msg.sender}-${index}`}
                    className={`${styles.messageItem} ${
                      msg.sender === sender ? styles.sent : styles.received
                    }`}
                  >
                    {msg.type === "file" ? (
                      <div className={styles.fileMessage}>
                        <a
                          href={`http://localhost:5000${msg.fileUrl || msg.content}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.fileLink}
                        >
                          {msg.fileUrl && (msg.fileUrl.endsWith(".jpg") || msg.fileUrl.endsWith(".jpeg") || msg.fileUrl.endsWith(".png") || msg.fileUrl.endsWith(".gif")) ? (
                            <img
                              src={`http://localhost:5000${msg.fileUrl || msg.content}`}
                              alt="file"
                              className={styles.imagePreview}
                            />
                          ) : (
                            <div className={styles.fileInfo}>
                              <Paperclip size={16} />
                              <span>{msg.fileUrl ? msg.fileUrl.split("/").pop() : msg.content.split("/").pop()}</span>
                            </div>
                          )}
                        </a>
                      </div>
                    ) : (
                      <div className={styles.textMessage}>
                        {msg.content}
                      </div>
                    )}
                    <div className={styles.messageTime}>
                      {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className={styles.noMessages}>
                    <p>No messages yet</p>
                    <p>Start the conversation!</p>
                  </div>
                )}
              </div>

              <div className={styles.inputArea}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.messageInput}
                />
                <div className={styles.inputActions}>
                  <label className={styles.fileInputLabel}>
                    <Paperclip size={20} />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className={styles.fileInput}
                    />
                  </label>
                  <button
                    onClick={() => sendMessage(message)}
                    className={styles.sendButton}
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.welcomeScreen}>
              <MessageCircle size={48} />
              <h2>Welcome to Chat</h2>
              <p>Select a conversation or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Chat;