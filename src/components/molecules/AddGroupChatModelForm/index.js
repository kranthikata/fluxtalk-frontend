import React, { useState } from "react";
import Input from "../../atoms/Input";
import { createGroupChat } from "../../../api/chatAPI";
import { searchUsers } from "../../../api/userSearchAPI";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/Paragraph";
import SearchBar from "../SearchBar";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";

const AddGroupChatModelForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    userName: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [error, setError] = useState("");

  //Function to handle the group creation
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    //create group chat
    try {
      setError("");
      const userIds = userTags.map((eachUser) => eachUser._id);
      await createGroupChat(formData.groupName, userIds);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  //Handle username input change
  const onChangeUserName = async (event) => {
    setFormData((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
    try {
      const { data } = await searchUsers(formData.userName);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle select user
  const handleSelectUser = (user) => {
    if (!userTags.includes(user.name)) {
      setUserTags([...userTags, user.name]);
    }
  };

  //Handle remove user
  const handleDeleteUserTag = (tagIndex) => {
    const newUserTags = userTags.filter((eachTag, index) => index !== tagIndex);
    setUserTags(newUserTags);
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <Input
        type="text"
        placeholder="Enter Group Name"
        value={formData.groupName}
        onChange={(event) =>
          setFormData((prevState) => ({
            ...prevState,
            groupName: event.target.value,
          }))
        }
        className="w-full px-4 py-3 text-black border-gray-300 rounded-md mb-2"
      />
      <SearchBar
        value={formData.userName}
        onChange={onChangeUserName}
        loading={searchResults.length === 0}
      />
      {searchResults.length !== 0 && (
        <ul
          className={`w-full h-28 overflow-y-auto pl-0 flex flex-col m-auto rounded-md z-10 mt-2 custom-scrollbar`}
        >
          {searchResults.map((eachUser) => (
            <li
              key={eachUser._id}
              onClick={() => handleSelectUser(eachUser)}
              className="px-2 rounded-md py-1 flex items-center mb-1 cursor-pointer hover:bg-gradient-to-r from-custom-blue-1 to-custom-green-1"
            >
              <Image
                src={eachUser.image}
                className="h-10 w-10 rounded-full"
                alt="user profile"
              />
              <Paragraph className="ml-2">{eachUser.name}</Paragraph>
            </li>
          ))}
        </ul>
      )}
      <div className="flex mt-1">
        {userTags.map((eachTag, index) => (
          <div className="flex mr-2">
            <span className="text-sm items-center flex bg-gradient-to-bl from-custom-blue-1 to-custom-green-1 px-2 rounded-full">
              {eachTag}
            </span>
            <Button type="button" onClick={() => handleDeleteUserTag(index)}>
              <Icon icon={IoIosClose} size={25} />
            </Button>
          </div>
        ))}
      </div>

      {error.showError && (
        <Paragraph className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {error.errorMessage}
        </Paragraph>
      )}

      <Button
        type="submit"
        className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-custom-blue hover:shadow-2xl hover:scale-105 duration-300"
      >
        Create
      </Button>
    </form>
  );
};

export default AddGroupChatModelForm;
