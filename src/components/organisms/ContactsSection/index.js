import React, { useContext } from "react";
import ContactsHeader from "../../molecules/ContactsHeader";
import ContactsList from "../../molecules/ContactsList";
import ContactsContext from "../../../context/ContactsContext";

const ContactsSection = ({ toggleModel }) => {
  const { contacts, isLoading, activeItem, updateActiveItem } =
    useContext(ContactsContext); // Using the context
  return (
    <div
      className={`w-[calc(100vw_-_4rem)] p-4 fixed left-16 md:w-64 border-r`}
    >
      <ContactsHeader toggleModel={toggleModel} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ContactsList
          contacts={contacts}
          activeItem={activeItem}
          toggleActiveItem={updateActiveItem}
        />
      )}
    </div>
  );
};

export default ContactsSection;
