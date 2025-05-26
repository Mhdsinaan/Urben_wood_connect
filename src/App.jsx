import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import Admin from "./Admin/pages/Admin";
import Users from "./Admin/pages/Users";
import AdminProducts from "./Admin/pages/AdminProducts";
import AddProduct from "./Admin/pages/AddProduct";
import EditProducts from "./Admin/pages/EditProducts";
import Order from "./Admin/pages/Order";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Bedroom", element: <Bedroom /> },
      { path: "/Dining", element: <Dining /> },
      { path: "/Livingroom", element: <Livingroom /> },
      { path: "/Decor", element: <Decor /> },
      { path: "/Cart", element: <Cart /> },
      { path: "/Products", element: <Products /> },
      { path: "/:category/ProductDetails/:id", element: <ProductDetails /> },
    ],
  },
  { path: "/Login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/Admin", element: <Admin /> },
  { path: "/Users", element: <Users /> },
  { path: "/AdminProducts", element: <AdminProducts /> },
  { path: "/AddProduct", element: <AddProduct /> },
  { path: "/EditProducts/:id", element: <EditProducts /> },
  { path: "/Order", element: <Order /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* ✅ ToastContainer added globally */}
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
