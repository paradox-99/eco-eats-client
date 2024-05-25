import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProv";
import { IoLogOutOutline } from "react-icons/io5";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
    const [theme, setTheme] = React.useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    const { user, logOut } = useContext(AuthContext);
    React.useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const routes = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/availableFoods'}>Available Foods</NavLink></li>
        <li><NavLink to={'/addFood'}>Add Food</NavLink></li>

        {
            user && <>
                <li><NavLink to={'/manageMyFoods'}>Manage My Foods</NavLink></li>
                <li><NavLink to={'/myFoodRequest'}>My Food Request</NavLink></li>
            </>
        }
    </>
    return (
        <div className="mt-3">
            <div className="navbar font-medium">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn pl-0 btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 bg-primary p-2 rounded-box w-52 font-montserrat">
                            {routes}
                            <div className="flex mt-2 ml-[6px]"><label className="cursor-pointer grid md:hidden place-items-center ml-2">
                                <input type="checkbox" defaultValue="synthwave" onClick={toggleTheme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            </label></div>
                        </ul>
                    </div>
                    <a href="/" className="btn pl-0 btn-ghost text-primary text-5xl font-pirata hover:bg-inherit">EcoEats</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-manrope lg:text-lg xl:text-xl">
                        {routes}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <img src={user.photoURL} alt="" className="hidden lg:flex mr-1 md:mr-3 w-12 h-12 rounded-full" data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} />}
                    {!user && <Link to={'/signin'} className="btn btn-sm btn-primary md:btn text-base rounded md:text-lg lg:text-xl font-montserrat ">Signin</Link>}
                    {
                        user && <button onClick={logOut} className="btn bg-inherit px-0 md:px-4 border-none shadow-none md:flex hidden bg-primary hover:bg-primary font-montserrat text-lg">Sign out</button>
                    }
                    {
                        user && <button onClick={logOut} className="btn px-2 text-2xl border-none shadow-none md:hidden flex bg-primary hover:bg-primary"><IoLogOutOutline/></button>
                    }
                </div>
                <label className="cursor-pointer md:grid place-items-center hidden ml-2">
                    <input type="checkbox" defaultValue="synthwave" onClick={toggleTheme} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
            <Tooltip id="my-tooltip" style={{ backgroundColor: "#0D2818", color: "white" }} />
        </div>
    );
};

export default Navbar;