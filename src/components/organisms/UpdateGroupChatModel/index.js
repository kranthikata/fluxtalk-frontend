import React, { useContext } from "react";
import ModelTemplate from "../../templates/ModelTemplate";
import Heading from "../../atoms/Heading";
import ModelContext from "../../../context/ModelContext";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";

const UpdateGroupChatModel = () => {
  const { currentUsers, handleRemoveUser } = useContext(ModelContext);
  return (
    <ModelTemplate>
      <div className="bg-gradient-to-br from-custom-blue to-custom-green-1 rounded-xl md:px-20 px-5 py-10 flex flex-col gap-5 items-center mx-4">
        <Heading level={1} className="text-xl md:text-3xl font-extrabold">
          Update Group
        </Heading>
        <Heading level={2} className="text-xl">
          Group Members
        </Heading>
        <ul className="flex">
          {currentUsers.map((eachUser) => (
            <li
              key={eachUser._id}
              className="flex items-center bg-gradient-to-tl from-cyan-500 to-gray-300 p-1 rounded-full mr-2"
            >
              <span>{eachUser.name}</span>
              <Button type="button" onClick={() => handleRemoveUser(eachUser)}>
                <Icon icon={IoIosClose} size={25} />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </ModelTemplate>
  );
};

export default UpdateGroupChatModel;
