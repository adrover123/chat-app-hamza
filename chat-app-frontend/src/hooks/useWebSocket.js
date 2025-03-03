import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useWebSocket = () => {
  const dispatch = useDispatch();
  let ws = null; // Ensure WebSocket persists

  useEffect(() => {
    ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => console.log("Connected to WebSocket server: ✅");

    ws.onmessage = async (event) => {
      try {
        let data;
        if (event.data instanceof Blob) {
          data = JSON.parse(await event.data.text());
        } else {
          data = JSON.parse(event.data);
        }

        console.log("Message received:", data); // 🔍 Debugging

        if (data.type === "history") {
          dispatch({ type: "SET_HISTORY", payload: data.messages });
        } else if (data.type === "message") {
          dispatch({ type: "ADD_MESSAGE", payload: data });
        }
      } catch (error) {
        console.error("WebSocket parsing error:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected ❌");

    return () => ws.close();
  }, [dispatch]);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Sending message:", message); // 🔍 Debugging
      ws.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open ❌");
    }
  };

  return sendMessage;
};

export default useWebSocket;
