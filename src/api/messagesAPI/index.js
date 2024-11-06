import axios from "axios";

const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
export const getMessages = (chatId) => {
  return axios.get(
    `https://fluxtalk-backend.onrender.com/api/v1/messages/${chatId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const sendMessage = (message, chatId) => {
  return axios.post(
    `https://fluxtalk-backend.onrender.com/api/v1/messages`,
    { content: message, chatId },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
