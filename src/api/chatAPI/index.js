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
