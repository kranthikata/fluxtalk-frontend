import React, { useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Heading from "../../atoms/Heading";
import ContactsContext from "../../../context/ContactsContext";
import ContactGroupImage from "../ContactGroupImage";
import ContactImage from "../ContactImage";
import { getChatDetails } from "../../../utils/chatUtils";

const ChatHeader = () => {
  const { deselectActiveItem, activeItem, handleDeleteChat } =
    useContext(ContactsContext);
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const [chatName, chatImage] = getChatDetails(user._id, activeItem);
  return (
    <div className="flex justify-between border-b pb-2 items-center">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <Button onClick={deselectActiveItem} className="mr-5">
            <Icon icon={IoArrowBackOutline} size={20} className="md:hidden" />
          </Button>
          {activeItem.isGroupChat ? (
            <ContactGroupImage userDetails={activeItem} />
          ) : (
            <ContactImage userImage={chatImage} />
          )}
          <Heading level={1} className="ml-2">
            {chatName}
          </Heading>
        </div>
        {!activeItem.isGroupChat && (
          <Button
            type="button"
            onClick={handleDeleteChat}
            className="border border-red-500 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white"
          >
            Delete
          </Button>
        )}
      </div>
      {activeItem.isGroupChat && (
        <Button type="button" onClick={() => console.log("Model here")}>
          <Icon icon={MdDriveFileRenameOutline} className="mr-4" size={20} />
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
