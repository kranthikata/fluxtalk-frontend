import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getContacts } from "../../api/contactsAPI";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setActiveItem(item);
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
        updateActiveItem,
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
