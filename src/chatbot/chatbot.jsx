import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';
import styles from './chatbot.module.css';

const OPENAI_BASE_URL = "http://localhost:5000";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${OPENAI_BASE_URL}/api/chat`, {
        message: input,
      });

      if (response.data?.reply) {
        const botMessage = { role: "bot", content: response.data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        setError('Invalid response from the chatbot.');
      }
    } catch (err) {
      console.error('Error: ', err);
      setError(err.response?.data?.error || "Error generating response");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.chatbotContainer}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>AI Assistant</h1>
          <p className={styles.chatSubtitle}>
            Ask me anything! I&apos;m here to help you with your questions.
          </p>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={`${styles.message} ${styles.bot}`}>
              Hello! How can I assist you today?
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className={styles.typing}>
              Bot is thinking
              <div className={styles.typingDots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
          
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={loading}
          />
          <button
            className={styles.sendButton}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}