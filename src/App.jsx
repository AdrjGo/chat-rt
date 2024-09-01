import { useState, useEffect } from "react";
import "./App.css";
import { database } from "./config/firebaseConfig";
import { ref, onValue, push } from "firebase/database";
import SendIcon from "./assets/icons/SendIcon";
import { getUsername } from "./scripts/getUsername";

function App() {
  //Actualizar el estado de los mensajes
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.values(data) : [];
      setMessages(messagesArray);
    });
  }, []);

  //Enviar mensajes a firebase
  const sendMessage = async(message) => {
    const username = await getUsername();
    if (message.trim()) {
      const messagesRef = ref(database, "messages");
      push(messagesRef, {
        text: message,
        timestamp: Date.now(),
        senderName: username,
      });
      setNewMessage("");
    }
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(newMessage);
    }
  };

  const isButtonDisabled = !newMessage.trim();

  return (
    <div className="container">
      <h1 className="title">CHAT EN TIEMPO REAL</h1>
      <div className="display">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.senderName === localStorage.getItem("username")
                ? "message-right"
                : "message-left"
            }`}
          >
            <span className="name">{message.senderName}</span>
            <p className="messages">{message.text}</p>
            <span className="time">{formatTimestamp(message.timestamp)}</span>
          </div>
        ))}
      </div>

      <div className="input-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          className="input"
        />
        <button
          onClick={() => sendMessage(newMessage)}
          className="send-button"
          disabled={isButtonDisabled}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default App;
