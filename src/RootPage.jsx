import { Outlet } from "react-router-dom";
import Navbar from "./components/header/Navbar";

const RootPage = () => {
    return (
        <div className="max-w-7xl mx-2 lg:mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootPage;