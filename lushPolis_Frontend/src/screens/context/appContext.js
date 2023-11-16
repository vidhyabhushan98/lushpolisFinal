import { io } from "socket.io-client";
import  baseUrl  from "../../api/serverAPI";
import React from "react";
const SOCKET_URL =`${baseUrl}`;
export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext();
