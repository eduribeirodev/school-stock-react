import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Product";
import Categories from "./pages/categories/Category";
import Login from "./pages/login/Login";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/",
    element: <Navigate to="/login" />, 
  },
  {
    path: "/stock-control",
    element: <Layout />, 
    children: [
      { path: "dashboard", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "Categories", element: <Categories /> },
    ],
  },
]);

export default routes;
