import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    if (!input.username || !input.email || !input.password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    if (!isValidEmail(input.email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      // Call API to register user
     const response = await api.post("/api/User/register", {
       username: input.username,
      email: input.email,
      password: input.password
    });
      console.log("respo:",response);
      
      if (response.data && response.status === 200) {
  toast.success("Registration successful");
  navigate("/login");
  setInput({ username: "", email: "", password: "" });
// } else if (response.data && response.status === 407) {
//   setError(response.data.message || "user already exist");
} else if (response.data && response.status === 400) {
  console.log("respo:", response);
  setError(response.data.message || "Registration Failed");
} else {
  setError("Registration failed. Please try again.");
}

    } catch (error) {
      console.error("Registration error:", error);
      // if (error.response && error.response.data && error.response.data.code === "400") {
      //   setError(error.response.data.message || "Registration Failed");
      // } else {
      //   setError("Something went wrong. Please try again later.");
      // }
      if(error.response.data.message){
        // setError(error.response.data.message)
        toast.error(error.response.data.message)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col justify-center items-center gap-5 w-full p-10 rounded-md border border-white/20 bg-black/80 shadow-lg">
          <h4 className="text-white text-2xl font-bold">Register</h4>
          <input
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
            name="username"
            value={input.username}

            required
          />
          <input
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            name="email"
            value={input.email}
           
            required
          />
          <input
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={input.password}
            required
            minLength="6"
          />
          {error && <p className="text-red-500 text-sm w-full">{error}</p>}
          <button 
            className="rounded-md bg-blue-800 text-white w-full p-2 mt-5 font-semibold hover:bg-blue-700 transition disabled:bg-blue-900 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-white text-xs">
            Already have an account?{" "}
            <Link to={"/login"} className="underline hover:text-blue-500">
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;