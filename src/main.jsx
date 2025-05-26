import { createRoot } from "react-dom/client";
import DataProvider from "./context/DataContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App";
import { UsersProvider } from "./context/usersContext";



createRoot(document.getElementById("root")).render(
  
    <UsersProvider>
      <DataProvider>
        
        
        <CartProvider>
          <App />
        </CartProvider>
        
      </DataProvider>
    </UsersProvider>
 
);
