import axios from "axios";

const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
export const createChat = (userId) => {
  return axios.post(
    "https://fluxtalk-backend.onrender.com/api/v1/chats/",
    {
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const deleteChat = (chatId) => {
  return axios.delete(
    `https://fluxtalk-backend.onrender.com/api/v1/chats/${chatId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const createGroupChat = (groupName, userIds) => {
  return axios.post(
    "https://fluxtalk-backend.onrender.com/api/v1/chats/group/",
    { name: groupName, users: JSON.stringify(userIds) },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const addUserToGroup = (chatId, userId) => {
  return axios.put(
    "https://fluxtalk-backend.onrender.com/api/v1/chats/groupadd/",
    { chatId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const removeUserFromGroup = (chatId, userId) => {
  return axios.put(
    "https://fluxtalk-backend.onrender.com/api/v1/chats/groupremove",
    { chatId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const renameGroup = (chatId, chatName) => {
  return axios.put(
    "https://fluxtalk-backend.onrender.com/api/v1/chats/rename",
    { chatId, chatName },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
