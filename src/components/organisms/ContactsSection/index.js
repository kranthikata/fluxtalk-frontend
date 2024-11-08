import React, { useContext } from "react";
import ContactsHeader from "../../molecules/ContactsHeader";
import ContactsList from "../../molecules/ContactsList";
import ContactsContext from "../../../context/ContactsContext";
import ModelContext from "../../../context/ModelContext";
import Icon from "../../atoms/Icon";
import { TailSpin } from "react-loader-spinner";
import AddGroupChatModel from "../../organisms/AddGroupChatModel";

const ContactsSection = () => {
  const { contacts, isLoading, activeItem, updateActiveItem } =
    useContext(ContactsContext); // Using the context of contacts
  const { setShowCreateModel, showCreateModel } = useContext(ModelContext);
  return (
    <>
      <div
        className={`w-[calc(100vw_-_4rem)] p-4 fixed left-16 md:w-64 border-r ${
          activeItem && "hidden md:block"
        }`}
      >
        <ContactsHeader
          toggleModel={() => setShowCreateModel((prevState) => !prevState)}
        />
        {isLoading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Icon icon={TailSpin} width={35} height={35} />
          </div>
        ) : (
          <ContactsList
            contacts={contacts}
            activeItem={activeItem}
            toggleActiveItem={updateActiveItem}
          />
        )}
      </div>
      {showCreateModel && <AddGroupChatModel />}
    </>
  );
};

export default ContactsSection;
