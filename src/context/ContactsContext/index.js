import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { getContacts } from "../../api/contactsAPI";
import { deleteChat } from "../../api/chatAPI";
import MessagesContext from "../MessagesContext";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChatId, setMessages } = useContext(MessagesContext);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactUpdate = async () => {
    await fetchContacts();
  };

  const updateActiveItem = (item) => {
    setMessages([]);
    setActiveItem(item);
    setChatId(item._id);
  };

  const deselectActiveItem = () => {
    setActiveItem(null);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setActiveItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        activeItem,
        setActiveItem,
        updateActiveItem,
        deselectActiveItem,
        handleDeleteChat,
        handleContactUpdate,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

ContactsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContactsContext;
