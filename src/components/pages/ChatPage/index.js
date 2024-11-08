import React from "react";
import Sidebar from "../../organisms/Sidebar";
import ContactsSection from "../../organisms/ContactsSection";
import ChatSection from "../../organisms/ChatSection";
import ProfileSection from "../../organisms/ProfileSection";
import { SidebarProvider } from "../../../context/SidebarContext";
import { ContactsProvider } from "../../../context/ContactsContext";
import { ModelProvider } from "../../../context/ModelContext";
import { MessagesProvider } from "../../../context/MessagesContext";

const ChatPage = () => {
  return (
    <SidebarProvider>
      <MessagesProvider>
        <ContactsProvider>
          <ModelProvider>
            <div className="flex">
              <Sidebar />
              <ContactsSection />
              <ChatSection />
              <ProfileSection />
            </div>
          </ModelProvider>
        </ContactsProvider>
      </MessagesProvider>
    </SidebarProvider>
  );
};

export default ChatPage;
