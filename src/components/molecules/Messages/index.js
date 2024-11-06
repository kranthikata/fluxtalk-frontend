import React, { useRef } from "react";
import Image from "../../atoms/Image";
import { isSameSender, isLastMessage } from "../../../utils/chatUtils";

const Messages = ({ messages }) => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const ulRef = useRef();

  return (
    <ul
      ref={ulRef}
      className="mt-auto overflow-y-auto custom-scrollbar flex flex-col"
    >
      {messages &&
        messages.map((eachMessage, index) => (
          <li key={eachMessage._id} className="flex items-center mb-2">
            {(isSameSender(messages, eachMessage, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Image
                src={eachMessage.sender.image}
                alt={eachMessage.sender.name}
                className="w-10 h-10 rounded-full mr-1"
              />
            )}
            <span
              className={`px-2 py-1 rounded-xl text-sm bg-gradient-to-r ${
                eachMessage.sender._id === user._id
                  ? "from-custom-blue-1 to-custom-blue ml-auto rounded-br-none"
                  : "from-custom-green-1 to-custom-green"
              }`}
            >
              {eachMessage.content}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default Messages;
