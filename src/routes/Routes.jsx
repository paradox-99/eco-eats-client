// import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootPage from "../RootPage";
import Home from "../components/pages/home/Home";
import AvalibleFoods from "../components/pages/availableFoods/AvalibleFoods";
import AddFood from "../components/pages/addFood.jsx/AddFood";
import ManageMyFood from "../components/pages/manageMyFood/ManageMyFood";
import MyFoodRequest from "../components/myFoodRequest/MyFoodRequest";
import Signin from "../components/pages/access/Signin";
import Signup from "../components/pages/access/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage></RootPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/availableFoods',
                element: <AvalibleFoods></AvalibleFoods>
            },
            {
                path: '/addFood',
                element: <AddFood></AddFood>
            },
            {
                path: '/manageMyFoods',
                element: <ManageMyFood></ManageMyFood>
            },
            {
                path: '/myFoodRequest',
                element: <MyFoodRequest></MyFoodRequest>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
 ])

export default router;