//This is the frontend file created for the Chatbot
//Created by Sanuka Dabare

//Importing neccessary dependencies from the React and other Libraries for the use
import {useState,useRef,useEffect} from 'react';
import axios from 'axios';//importing axios for managing HTTP requests

//importing neccessary css files for styling purposes
import './chatbot.css'
import '../components/navigation/navigation'
import '../components/navigation/navigation.module.css'
import '../components/footer/footer'
import '../components/footer/footer.module.css'

const OPENAI_BASE_URL= "http://localhost:5001";//setting the base URL for managing API requests

//Defining the main Chatbot Component
export default function Chatbot() {
  const[messages,setMessages]=useState([]);//This is the array to Store the chat messages
  const[input,setInput]=useState('');//This is for managing the user input
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);//stores the error messages if any error occured
  const messagesEndRef=useRef(null);

  const scrollToBottom=()=>{
    messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
  };

  useEffect(()=>{
    scrollToBottom();
  },[messages])


  //This is the function respomsible for sending messages to the chatbot
  const sendMessage=async () => {
    if(!input.trim()) return;//This prevents user from sending empty messages

    const userMessage={role: 'user',content: input};
    setMessages(prevMessages=> [...prevMessages,userMessage]);

    setInput('');
    setLoading(true);//Shows the loading indicator to the user
    setError(null);

    try {
      //sends the user input to the openai which is the chatbot api
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
        setError(err.response?.data?.error||"Error generating response");
    } finally {
        setLoading(false);
    }
  };

  


  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg,index) =>(
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
          
        ))}
        {loading && <p>Bot is typing..</p>}
        {error && <p className="error">{error}</p>}
        
      </div>
      {/* Input field for user to send messages and the send button */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) =>setInput(e.target.value)}
          placeholder="Type a message.."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

