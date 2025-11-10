import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/home/Home";
import Categories from "../pages/categories/Categories";
import Products from "../pages/products/Product";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import Entries from "../pages/entries/Entries";
import Exits from "../pages/exits/Exits";
import Sales from "../pages/sales/Sales"
import Suppliers from "../pages/suppliers/Suppliers";
import Users from "../pages/users/Users";

const routes = createBrowserRouter([

    
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },

   
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/stock-control", 
                element: <Layout />,
                children: [
                    
                    { index: true, element: <Navigate to="dashboard" replace /> }, 
                    
                    
                    { path: "dashboard", element: <Home /> },
                    { path: "products", element: <Products /> }, 
                    { path: "categories", element: <Categories /> },
                    { path: "entries", element: <Entries /> },
                    { path: "exits", element: <Exits /> },
                    { path: "sales", element: <Sales /> },
                    { path: "suppliers", element: <Suppliers /> },
                    { path: "users", element: <Users /> },
                ],
            },
        ],
    },
]);

export default routes;