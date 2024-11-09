import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { getContacts } from "../../api/contactsAPI";
import { deleteChat } from "../../api/chatAPI";
import MessagesContext from "../MessagesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChatId, setMessages } = useContext(MessagesContext);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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
      setIsDeleteLoading(true);
      await deleteChat(chatId);
      setActiveItem(null);
      await handleContactUpdate();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleteLoading(false);
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
        isDeleteLoading,
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
