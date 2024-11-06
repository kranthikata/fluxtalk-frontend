import { createContext, useContext, useEffect, useState } from "react";
import ContactsContext from "../ContactsContext";
import { removeUserFromGroup } from "../../api/chatAPI";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const [error, setError] = useState("");
  const [currentUsers, setCurrentUsers] = useState([]);
  const { activeItem, setActiveItem } = useContext(ContactsContext);

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
      selectedUser._id === user._id ? setActiveItem(null) : setActiveItem(data);
      setShowModel(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModelContext.Provider
      value={{
        showModel,
        currentUsers,
        error,
        setError,
        handleRemoveUser,
        setCurrentUsers,
        setShowModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContext;
