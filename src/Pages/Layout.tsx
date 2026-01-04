import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout=()=>{
    return(
         <div className="root-layout">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
    )
}
export default Layout;