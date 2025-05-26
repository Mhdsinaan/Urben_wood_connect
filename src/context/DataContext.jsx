import React, { createContext, useEffect, useState, useContext } from "react";
import api from "../../api/api";


export const DataContext = createContext();

function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("api/Product/GetAll");
        console.log(response.data);
        
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ posts, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;


