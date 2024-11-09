import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../../api/messagesAPI";
import { toast } from "react-toastify";

const socket = io("https://fluxtalk-backend.onrender.com");

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [chatId, setChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messagesLoadingStatus, setMessagesLoadingStatus] = useState("INITIAL");

  useEffect(() => {
    if (chatId) {
      //Join the chat room when chatId changes
      socket.emit("join", chatId);

      //Fetch initial messages
      const fetchMessages = async () => {
        try {
          setMessagesLoadingStatus("LOADING");
          const { data } = await getMessages(chatId);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [chatId]: data,
          }));
          setMessagesLoadingStatus("DONE");
        } catch (error) {
          toast.error(error.message);
        }
      };

      fetchMessages();

      //Listen for new messages
      socket.on("chat message", (msg) => {
        if (msg.room === chatId) {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [chatId]: [...(prevMessages[chatId] || []), msg],
          }));
        }
      });

      //Clean up the socket listener
      return () => {
        socket.off("chat message");
        setMessagesLoadingStatus("INITIAL");
      };
    }
  }, [chatId]);

  const handleSendMessage = async (newMessage, activeItemId) => {
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await sendMessage(newMessage, activeItemId);
        socket.emit("chat message", { ...data, room: activeItemId });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const activeChatMessages = messages[chatId] || [];

  return (
    <MessagesContext.Provider
      value={{
        activeChatMessages,
        newMessage,
        messagesLoadingStatus,
        setNewMessage,
        setChatId,
        handleSendMessage,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
