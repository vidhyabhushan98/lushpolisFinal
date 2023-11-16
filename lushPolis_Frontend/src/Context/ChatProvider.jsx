import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userr = localStorage.getItem("user");
    console.log(userr)
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log(userInfo);
    setUser(userInfo);
    

    if (!userInfo) navigate("/");
  }, [navigate]);
//user=JSON.parse(localStorage.getItem("user"));
  
  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
//user=JSON.parse(localStorage.getItem("user"));
export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
