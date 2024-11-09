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
    if (!chatId) return;

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

    //Clean up the socket listener
    return () => {
      socket.off("chat message");
      setMessagesLoadingStatus("INITIAL");
    };
  }, [chatId]);

  //Listen for new messages
  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      if (msg.room === chatId) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [chatId]: [...(prevMessages[chatId] || []), msg],
        }));
      }
    };

    socket.on("chat message", handleIncomingMessage);

    // Clean up the message listener on unmount
    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [chatId]);

  useEffect(() => {
    const handleError = () => {
      toast.error("Connection error, trying to reconnect...");
    };

    const handleReconnect = () => {
      if (chatId) {
        socket.emit("join", chatId); // Rejoin room on reconnect
      }
    };

    socket.on("connect_error", handleError);
    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("connect_error", handleError);
      socket.off("reconnect", handleReconnect);
    };
  }, [chatId]);

  const handleSendMessage = async (newMessage, activeItemId) => {
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await sendMessage(newMessage, activeItemId);
        console.log(data);
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
