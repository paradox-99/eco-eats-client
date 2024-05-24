import { useContext } from "react";
import { AuthContext } from "../provider/AuthProv";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {

    const { user, status } = useContext(AuthContext);
    const location = useLocation();

    if (status)
        return <div className="flex items-center justify-center w-full h-[600px]"><Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            /></div>;

    if (user)
        return children;
    else
        toast.error("Please login first", {
            position: "top-center",
            duration: 2500,
        });

    return <Navigate state={location.pathname} to={'/signin'}></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}

export default PrivateRoute;