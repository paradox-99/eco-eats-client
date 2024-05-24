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
import PrivateRoute from "../private/PrivateRoute";
import ViewDetails from "../components/shared/ViewDetails";
import ErrorPage from "../ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage></RootPage>,
        errorElement: <ErrorPage></ErrorPage>,
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
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: '/manageMyFoods',
                element: <PrivateRoute><ManageMyFood></ManageMyFood></PrivateRoute>
            },
            {
                path: '/myFoodRequest',
                element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/food/:id',
                loader: ({params}) => fetch(`http://localhost:3000/food/${params.id}`),
                element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
            }
        ]
    }
 ])

export default router;