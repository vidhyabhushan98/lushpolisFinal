import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatProvider, { ChatState } from "../../Context/ChatProvider";
import headerleaf from "../../assets/images/chatbggg.png";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  // const { user } = ChatState();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <ChatProvider>
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="88.5vh" p="10px" display="flex" bg={`url(${headerleaf})`} bgRepeat="repeat" bgSize="120rem">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
    </ChatProvider>
  );
};

export default Chat;
