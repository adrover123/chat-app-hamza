import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../hooks/useWebSocket";

const Chat = () => {
  const sendMessage = useWebSocket(); // Get WebSocket function to send messages
  const [username] = useState(() => "User" + Math.floor(Math.random() * 1000));
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.messages);
  const chatEndRef = useRef(null); // Auto-scroll ref

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({ username, text: message });
      setMessage(""); // Clear input after sending
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // 🔥 Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Retro Chat Room</h2>
      <p style={styles.userTag}>Logged in as: <strong>{username}</strong></p>
      
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <p key={index} style={styles.message}>
            <strong style={{ color: msg.username === username ? "#ffcc00" : "#ff3399" }}>
              {msg.username}:
            </strong> {msg.text}
          </p>
        ))}
        <div ref={chatEndRef} /> {/* Invisible div for auto-scrolling */}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// 🔥 Keeping the original RETRO STYLING
const styles = {
  container: { 
    maxWidth: "400px", 
    margin: "auto", 
    textAlign: "center", 
    fontFamily: "Press Start 2P, cursive", 
    backgroundColor: "#1a001a",  // Dark Purple Background
    padding: "20px", 
    borderRadius: "10px", 
    border: "4px solid #ffcc00", 
    color: "#fff"
  },
  title: { 
    color: "#ff3399", 
    textShadow: "2px 2px #00ffff"
  },
  userTag: { 
    fontSize: "12px", 
    color: "#ffcc00"
  },
  chatBox: { 
    border: "2px solid #ff3399", 
    padding: "10px", 
    height: "300px", 
    overflowY: "auto", 
    marginBottom: "10px", 
    backgroundColor: "#330033", // Dark Magenta Inside
    scrollbarWidth: "thin",
    scrollbarColor: "#ff3399 #222"
  },
  message: { 
    textAlign: "left", 
    fontSize: "12px" 
  },
  inputContainer: { 
    display: "flex", 
    gap: "10px" 
  },
  input: { 
    flex: 1, 
    padding: "10px", 
    fontSize: "12px", 
    backgroundColor: "#000", 
    color: "#ffcc00", 
    border: "2px solid #ffcc00"
  },
  button: { 
    padding: "10px", 
    cursor: "pointer", 
    backgroundColor: "#00ff99", 
    color: "#000", 
    border: "2px solid #00ff99", 
    fontWeight: "bold"
  }
};

export default Chat;
