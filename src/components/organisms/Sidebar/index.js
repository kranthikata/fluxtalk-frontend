import React, { useContext, useState, useRef, useEffect } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import SidebarContext from "../../../context/SidebarContext";
import SidebarHeader from "../../molecules/SidebarHeader";
import SearchBar from "../../molecules/SearchBar";
import SidebarNavigation from "../../molecules/SidebarNavigation";
import SidebarUserProfile from "../../molecules/SidebarUserProfile";
import { searchUsers } from "../../../api/userSearchAPI";
import SearchResultItem from "../../molecules/SearchResultItem";
import { createChat } from "../../../api/chatAPI";

const navItems = [
  {
    id: 0,
    icon: HiOutlineChatBubbleBottomCenterText,
    text: "Chats",
    active: true,
  },
];
const Sidebar = () => {
  const { expanded, navigateTo, isMenuOpened, toggleMenu, toggleSidebar } =
    useContext(SidebarContext); //Utilizing the sidebarContext
  const { user } = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    usersList: [],
    isloading: false,
  });

  useEffect(() => {
    //Function for the detecting the click outside the sidebar
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        expanded
      ) {
        toggleSidebar();
      }
    };

    //Adding the event listener
    document.addEventListener("mousedown", handleClickOutside);

    //Clean up funcion
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded, toggleSidebar]);

  //Creating the reference to the Sidebar
  const sidebarRef = useRef();

  //Function to perform the search
  const performUserSearch = async (username) => {
    //Checking search input is empty
    if (username === "") {
      setSearchResults({
        usersList: [],
        isloading: false,
      });
      return;
    }

    //Setting loading view
    setSearchResults({
      ...searchResults,
      isloading: true,
    });

    //searching for users
    try {
      const response = await searchUsers(username);
      setSearchResults((prevState) => ({
        ...prevState,
        usersList: response.data,
        isloading: false,
      })); //setting the results to display
    } catch (error) {
      console.log(error);
    } finally {
      setSearchResults((prevState) => ({
        ...prevState,
        isloading: false,
      }));
    }
  };

  //Handling the user search input
  const handleSearchInput = (event) => {
    setSearchInputValue(event.target.value);
    performUserSearch(event.target.value);
  };

  //Create a chat with the selected user from search results
  const createChatWithUser = async (userId) => {
    const { data } = await createChat(userId);
    console.log(data);
  };

  //Handling the logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigateTo("/");
  };

  return (
    <aside
      ref={sidebarRef}
      className={`h-screen z-10 ${expanded ? "w-60" : "w-16"}`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <SidebarHeader />
        <SearchBar
          value={searchInputValue}
          onChange={handleSearchInput}
          loading={searchResults.isloading}
        />
        {searchResults.usersList.length > 0 && (
          <ul
            className={`w-[85%] pl-0 max-h-32 border overflow-auto custom-scrollbar flex flex-col m-auto rounded-md ${
              !expanded && "hidden"
            } z-10`}
          >
            {searchResults.usersList.map((eachUser) => (
              <SearchResultItem
                key={eachUser._id}
                id={eachUser._id}
                username={eachUser.name}
                image={eachUser.image}
                createChatWithUser={createChatWithUser}
              />
            ))}
          </ul>
        )}
        <SidebarNavigation items={navItems} />
        <SidebarUserProfile
          user={user}
          onLogout={handleLogout}
          onClick={toggleMenu}
          isMenuOpened={isMenuOpened}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
