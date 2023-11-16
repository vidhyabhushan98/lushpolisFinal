import 'bootstrap/dist/css/bootstrap.min.css'
import Routing from './routes/Routing'
import { useEffect } from "react";
import { logoutAllTabs } from "./auth/auth";
import {loginAllTabs} from "./auth/auth";


function App() {


  useEffect(() => {
    logoutAllTabs()
   }, [])
    useEffect(() => {
    loginAllTabs()
    }, [])
  
  return (
    <>
      <Routing/>
    </>
  );
}
export default App
