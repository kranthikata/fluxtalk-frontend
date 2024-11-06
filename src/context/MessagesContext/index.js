import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../../api/messagesAPI";

const socket = io("https://fluxtalk-backend.onrender.com");

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    if (chatId) {
      //Join the chat room when chatId changes
      socket.emit("join", chatId);

      //Listen for new messages
      socket.on("chat message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      //Fetch initial messages
      const fetchMessages = async () => {
        try {
          const { data } = await getMessages(chatId);
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchMessages();

      //Clean up the socket listener
      return () => {
        socket.off("chat message");
      };
    }
  }, [chatId]);

  const handleSendMessage = async (newMessage, activeItem) => {
    if (newMessage) {
      try {
        const { data } = await sendMessage(newMessage, activeItem);
        socket.emit("chat message", { ...data, room: activeItem });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MessagesContext.Provider
      value={{ messages, setChatId, handleSendMessage, setMessages }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
