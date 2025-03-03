const WebSocket = require("ws");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(5000, () => console.log("Server running on port 5000 🚀"));
const wss = new WebSocket.Server({ server });

let messageHistory = []; // Store message history

wss.on("connection", (ws) => {
  console.log("New client connected ✅");

  // Send chat history to new user
  ws.send(JSON.stringify({ type: "history", messages: messageHistory }));

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log("New message received:", parsedMessage.text); // 🔍 Debugging

      messageHistory.push(parsedMessage); // Save message

      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "message", ...parsedMessage }));
        }
      });
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => console.log("Client disconnected ❌"));
});
