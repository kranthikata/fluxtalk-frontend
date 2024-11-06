import React, { useContext } from "react";
import Messages from "../Messages";
import MessageInputField from "../MessageInputField";
import ContactsContext from "../../../context/ContactsContext";
import MessagesContext from "../../../context/MessagesContext";

const ChatBody = () => {
  const { activeItem } = useContext(ContactsContext);
  const { messages } = useContext(MessagesContext);
  return (
    <div className="flex flex-col h-[91vh] justify-between">
      <Messages messages={messages} />
      <MessageInputField activeItem={activeItem} />
    </div>
  );
};

export default ChatBody;
