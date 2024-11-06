import React, { useContext, useState } from "react";
import Input from "../../atoms/Input";
import SearchBar from "../SearchBar";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";
import ContactsContext from "../../../context/ContactsContext";
import ModelContext from "../../../context/ModelContext";
import { addUserToGroup, renameGroup } from "../../../api/chatAPI";
import { searchUsers } from "../../../api/userSearchAPI";

const EditGroupChatModelForm = () => {
  const { activeItem } = useContext(ContactsContext);
  const { setCurrentUsers, error, setError, setShowModel, handleRemoveUser } =
    useContext(ModelContext);
  const [formData, setFormData] = useState({
    groupName: "",
    userName: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [userTags, setUserTags] = useState([]);

  //Handle change username
  const handleChangeUserName = async (event) => {
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

  //Handle add new user
  const handleAddUser = async (selectedUser) => {
    setError("");
    const { user } = JSON.parse(localStorage.getItem("userInfo"));
    //Checking does user already exists
    if (
      activeItem.users.find((eachUser) => eachUser._id === selectedUser._id)
    ) {
      setError("User Already Exists");
      return;
    }

    //Checking loggedIn user is not group admin
    if (activeItem.groupAdmin._id !== user._id) {
      setError("Only admin can add new members");
      return;
    }
    try {
      const { data } = await addUserToGroup(activeItem._id, selectedUser._id);
      setCurrentUsers((prevState) => [...prevState, data]);
      setShowModel(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle delete user tag that is added newly
  const handleDeleteUserTag = (tagIndex) => {
    const newTagsList = userTags.filter((eachTag, index) => index !== tagIndex);
    setUserTags(newTagsList);
  };

  //Handle rename
  const handleRename = async () => {
    //Check group name is empty
    if (!formData.groupName) {
      return;
    }

    //Perfom rename
    try {
      await renameGroup(activeItem._id, formData.groupName);
      setShowModel(false);
    } catch (error) {
      console.log(error);
    }
    setFormData((prevState) => ({ ...prevState, groupName: "" }));
  };

  return (
    <form>
      <Input
        type="text"
        placeholder="Rename Group"
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
        onChange={handleChangeUserName}
        className="w-full px-4 py-3 text-black border-gray-300 rounded-md"
      />
      {searchResults.length > 0 && (
        <ul
          className={`w-full h-28 overflow-y-auto pl-0 flex flex-col m-auto rounded-md z-10 mt-2 custom-scrollbar`}
        >
          {searchResults.map((eachUser) => (
            <li
              key={eachUser._id}
              onClick={() => handleAddUser(eachUser)}
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

      <div className="flex justify-between">
        <button
          type="submit"
          onClick={() => {
            const { user } = JSON.parse(localStorage.getItem("userInfo"));
            handleRemoveUser(user);
          }}
          className="mt-4 w-[49%] flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-gradient-to-t from-red-500 to-red-400 hover:bg-gradient-to-b"
        >
          Leave Group
        </button>

        <button
          type="submit"
          onClick={handleRename}
          className="mt-4 w-[49%] flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-gradient-to-t from-custom-green to-custom-green-1 hover:bg-gradient-to-b"
        >
          Update
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {error}
        </p>
      )}
    </form>
  );
};

export default EditGroupChatModelForm;
