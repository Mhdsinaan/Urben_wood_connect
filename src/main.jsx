import { createRoot } from "react-dom/client";
import DataProvider from "./context/DataContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App";
import { UsersProvider } from "./context/usersContext";
import {WishlistProvider} from "./context/WishlistContext";

createRoot(document.getElementById("root")).render(
  <UsersProvider>
    <DataProvider>
       <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </WishlistProvider>
    </DataProvider>
  </UsersProvider>
);
