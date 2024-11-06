import React, { useContext } from "react";
import ContactsContext from "../../../context/ContactsContext";
import ChatSelectedView from "../../molecules/ChatSelectedView";
import NoChatSelectedView from "../../molecules/NoChatSelectedView";

const ChatSection = () => {
  const { activeItem } = useContext(ContactsContext);
  return <>{activeItem ? <ChatSelectedView /> : <NoChatSelectedView />}</>;
};

export default ChatSection;
