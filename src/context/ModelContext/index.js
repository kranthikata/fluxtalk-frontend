import { createContext, useContext, useEffect, useState } from "react";
import ContactsContext from "../ContactsContext";
import { deleteChat, removeUserFromGroup } from "../../api/chatAPI";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [error, setError] = useState("");
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const { activeItem, setActiveItem, handleContactUpdate } =
    useContext(ContactsContext);

  useEffect(() => {
    setCurrentUsers(activeItem?.users);
  }, [activeItem]);

  //Handle delete user from group
  const handleRemoveUser = async (selectedUser) => {
    setError("");
    const { user } = JSON.parse(localStorage.getItem("userInfo"));

    //Checking if the user is the admin or not
    if (
      activeItem.groupAdmin._id !== user._id &&
      user._id !== selectedUser._id
    ) {
      setError("Only Admin can remove members");
      return;
    }

    //Removing group member
    try {
      const { data } = await removeUserFromGroup(
        activeItem._id,
        selectedUser._id
      );
      console.log(selectedUser._id === user._id);
      console.log(data.removedMember);
      if (
        selectedUser._id === user._id ||
        data.removedMember.users.length === 1
      ) {
        setActiveItem(null);
        setShowUpdateModel(false);
        await deleteChat(activeItem._id);
        await handleContactUpdate();
      } else {
        setActiveItem(data.removedMember);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (currUser) => {
    try {
      setIsUpdateLoading(true);
      await handleRemoveUser(currUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        showCreateModel,
        showUpdateModel,
        currentUsers,
        error,
        isUpdateLoading,
        setIsUpdateLoading,
        setError,
        handleRemove,
        setCurrentUsers,
        setShowCreateModel,
        setShowUpdateModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContext;
