import { useState, useRef, useEffect } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! ¿Cómo estás?", sender: "bot" },
    { id: 2, text: "¡Hola! Estoy bien, gracias.", sender: "user" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Manejo de envío de mensaje
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { id: messages.length + 1, text: newMessage, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage = { id: messages.length + 2, text: "¡Genial! ¿En qué puedo ayudarte?", sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="flex flex-col max-w-md mx-auto h-screen p-4 bg-gray-100">
      {/* Encabezado */}
      <div className="bg-blue-500 text-white text-center py-2 rounded-lg">
        <h2 className="text-lg font-bold">Chat Soporte</h2>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg w-fit max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Entrada de mensaje */}
      <div className="flex gap-2 p-2 bg-white shadow-md rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
