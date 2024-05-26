import { Outlet } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Footer from "./components/shared/Footer";

const RootPage = () => {
    return (
        <div>
            <div className="max-w-7xl mx-2 lg:mx-5 xl:mx-auto">
                <Navbar></Navbar>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootPage;