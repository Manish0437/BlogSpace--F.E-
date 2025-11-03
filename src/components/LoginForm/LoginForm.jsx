import { CgLock } from "react-icons/cg";
import { FaRegEnvelope } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try {
      const loginData = { email, password};
      console.log("Login data:", loginData);
      const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        // localStorage.clear();
        localStorage.setItem("loggedin-user-email", email);
        console.log("Stored loggedin-user-email in localStorage:", localStorage.getItem("loggedin-user-email"));
        navigate('/');
      } else {
        console.error("Login failed:", data);
        setError(data.message || "Login failed");
      }
    } catch(error) {
      console.error("Error during login:", error);
      setError("Unable to connect to server");  
    }
  };

  const goBack = () => {
    navigate('/add-user');
  };

  return (
    <div className="w-screen h-[100vh] flex items-center flex-col justify-center">
      <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
      <p className="text-lg text-gray-500">
        Sign in to your account to continue
      </p>
      <form className="w-[80%] md:w-[40%] flex flex-col gap-4 mt-4 border-1 border-gray-400 p-6 rounded-md shadow-md text-left" id="loginForm"
  name="loginForm">
        <div className="flex items-center text-left">
          <button type='button' onClick={goBack}>
            <IoArrowBack />
          </button>
          <p className="ml-2">Back</p>
        </div>
        <label htmlFor="email" className="text-black font-semibold">
          Email
        </label>
        <div className="flex flex-row items-center border border-gray-300 bg-gray-200 p-2 rounded-md w-[100%]" id="email">
          <FaRegEnvelope className="text-[15px] mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            className="border-none outline-none flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label htmlFor="password" className="text-black font-semibold">
          Password
        </label>
        <div className="flex flex-row items-center border border-gray-300 bg-gray-200 p-2 rounded-md w-[100%]" id="password">
          <CgLock className="text-[15px] mr-3" />
          <input
            type="password"
            placeholder="Enter your password"
            className="border-none outline-none flex-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="none"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md w-auto font-bold"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
