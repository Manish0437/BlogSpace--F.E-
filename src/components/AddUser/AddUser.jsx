import { PiUserBold } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa";
import { CgLock } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    localStorage.clear();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { userName, email, password ,bio:"No bio added", profilePic:"https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=" };
            console.log("Sending data:", userData);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            console.log("Raw response:", response);

            // Try to parse JSON safely
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error("Failed to parse JSON:", jsonError);
                const text = await response.text();
                console.log("Raw response text:", text);
                return;
            }

            console.log("Parsed data:", data);

            if (response.ok) {
                console.log("User registered successfully:", data);
                navigate('/login');
                // Delay redirect so console logs appear
                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 500);
            } else {
                console.error("Error registering user:", data);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };


    return (
        <div className="w-screen h-[100vh] flex items-center flex-col justify-center">
            <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
            <p className="text-lg text-gray-500">Sign up your account to continue</p>
            <form className="w-[80%] md:w-[40%] flex flex-col gap-4 mt-4 border-1 border-gray-400 p-6 rounded-md shadow-md text-left" onSubmit={handleSubmit}>
                <label htmlFor="username" className="text-black font-semibold">Username</label>
                <div className="flex flex-row items-center border border-gray-300 bg-gray-200 p-2 rounded-md w-[100%]" id="username">
                    <PiUserBold className="text-[15px] mr-3"/>
                    <input type="text" className="border-none outline-none flex-1" placeholder="Enter your username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <label htmlFor="email" className="text-black font-semibold">Email</label>
                <div className="flex flex-row items-center border border-gray-300 bg-gray-200 p-2 rounded-md w-[100%]" id="email">
                    <FaRegEnvelope className="text-[15px] mr-3"/>
                    <input type="email" placeholder="Enter your email" className="border-none outline-none flex-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <label htmlFor="password" className="text-black font-semibold">Password</label>
                <div className="flex flex-row items-center border border-gray-300 bg-gray-200 p-2 rounded-md w-[100%]" id="password">
                    <CgLock className="text-[15px] mr-3"/>
                    <input type="password" placeholder="Enter your password" className="border-none outline-none flex-1" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="none"/>
                </div>
                <p>Already a user? <a href="/login" className="text-blue-500">Login</a></p>
                <button type="submit" className="bg-black text-white p-2 rounded-md w-[100%] font-bold">Register</button>
            </form>
        </div>
    );
};

export default AddUser;