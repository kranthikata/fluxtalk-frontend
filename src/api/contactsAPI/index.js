import axios from "axios";

export const getContacts = () => {
  const { accessToken } = JSON.parse(localStorage.getItem("userInfo"));
  return axios.get("https://fluxtalk-backend.onrender.com/api/v1/chats/", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
