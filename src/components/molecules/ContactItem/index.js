import React from "react";
import ContactGroupImage from "../ContactGroupImage";
import ContactImage from "../ContactImage";
import ContactItemName from "../ContactItemName";
import LastMessage from "../LastMessage";
import { getChatDetails, getTimeStamp } from "../../../utils/chatUtils";

const ContactItem = ({ isActive, onSelectItem, userDetails }) => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const [chatName, chatImage] = getChatDetails(user._id, userDetails);
  let timeStamp;
  if (userDetails.lastMessage) {
    timeStamp = getTimeStamp(userDetails.lastMessage.updatedAt);
  } else {
    timeStamp = getTimeStamp(userDetails.createdAt);
  }
  return (
    <li
      onClick={onSelectItem}
      className={`flex justify-between mb-1 rounded-md hover:bg-gradient-to-r from-customBlue to-customGreen p-1 cursor-pointer ${
        isActive && "bg-gradient-to-r from-customBlue to-customGreen"
      }`}
    >
      {userDetails.isGroupChat ? (
        <ContactGroupImage userDetails={userDetails} />
      ) : (
        <ContactImage userImage={chatImage} />
      )}
      <div className="ml-2 flex flex-col justify-center md:w-[69%] w-[89%]">
        <ContactItemName userName={chatName} timeStamp={timeStamp} />
        {userDetails.lastMessage && (
          <LastMessage lastmessage={userDetails.lastMessage.content} />
        )}
      </div>
    </li>
  );
};

export default ContactItem;
