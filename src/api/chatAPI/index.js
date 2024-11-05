import axios from "axios";

export const createChat = (userId) => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
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
