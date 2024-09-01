import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  useEffect(() => {
    // Initial bot message
    addMessage("Hello, I'm here to provide information and support on gender-based violence issues. How can I assist you today?", false);
  }, []);

  const addMessage = (message, isUser) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isUser }]);
  };

  const sendMessage = async () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, true);
      setInputMessage('');

      try {
        const prompt = `
          You are a compassionate and knowledgeable chatbot designed to provide information and support on gender-based violence (GBV) issues. Please respond to the following message in a caring, non-judgmental manner, offering appropriate resources or advice:

          User message: "${inputMessage}"

          If the message contains any immediate danger or emergency situations, always prioritize the user's safety and suggest contacting local emergency services or a GBV hotline.
        `;

        const result = await model.generateContent(prompt);
        const botReply = result.response.text();
        addMessage(botReply, false);
      } catch (error) {
        console.error('Error:', error);
        addMessage("I'm sorry, I'm having trouble responding right now. If you need immediate assistance, please contact a local GBV support hotline.", false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button className="lets-chat-button" onClick={toggleChat}>
        Let's Chat
      </button>
      {isChatOpen && (
        <div className="chat-overlay">
          <div className="chat-container">
            <div className="chat-header">
              GBV Support and Education Chatbot
              <button className="close-button" onClick={toggleChat}>×</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                id="user-input"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button id="send-button" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;