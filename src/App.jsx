import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Admin/pages/Dashboard";
import UserDetails from "./Admin/pages/UserDetails";


import Home from "./pages/Home";
import Layout from "./components/Layout";
import Products from "./pages/Products";
import Bedroom from "./pages/Bedroom";
import Dining from "./pages/Dining";
import Livingroom from "./pages/Livingroom";
import Decor from "./pages/Decor";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLayout from "./Admin/AdminLayout";   
import Admin from "./Admin/pages/Admin";
import Users from "./Admin/pages/Users";
import AdminProducts from "./Admin/pages/AdminProducts";
import AddProduct from "./Admin/pages/AddProduct";
import EditProducts from "./Admin/pages/EditProducts";
import Order from "./Admin/pages/Order";
import Cart from "./pages/Cart";
import WishlistPage from "./pages/WishlistPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/Home", element: <Home /> },
      { path: "/Bedroom", element: <Bedroom /> },
      { path: "/Dining", element: <Dining /> },
      { path: "/Livingroom", element: <Livingroom /> },
      { path: "/Decor", element: <Decor /> },
      { path: "/Cart", element: <Cart /> },
      { path: "/WishlistPage", element: <WishlistPage /> },
      { path: "/Products", element: <Products /> },
      { path: "/:category/ProductDetails/:id", element: <ProductDetails /> },
    ],
  },
  { path: "/Login", element: <Login /> },
  { path: "/register", element: <Register /> },

  
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: "Admin", element: <Admin /> },               
      { path: "Users", element: <Users /> },
      { path: "Users/:id", element: <UserDetails /> },              
      { path: "AdminProducts", element: <AdminProducts /> },
      { path: "AddProduct", element: <AddProduct /> },    
      { path: "EditProducts/:id", element: <EditProducts /> }, 
      { path: "Order", element: <Order /> },
      {path:"Dashboard",element:<Dashboard/>}              
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
