import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Feed from "./components/Feed/Feed.jsx";
import ReadMoreBlog from "./components/ReadMoreBlog/ReadMoreBlog.jsx";
import CreateBlog from "./components/CreateBlog/CreateBlog.jsx";
import Profile from "./components/Profile/Profile.jsx";
import AddUser from "./components/AddUser/AddUser.jsx";
import UserContext from "./context/UserContext.js";

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedin-user-email");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// 👇 Separate the routing logic into a new component
function AppContent() {
  const location = useLocation();

  // Hide Navbar on these routes
  const hideNavbarPaths = ["/login", "/add-user"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  const defaultAvatar =
    "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "No bio added",
    profilePic: defaultAvatar,
  });
  const [loading, setLoading] = useState(true);
  const fetchUserData = async (email) => {
    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user-data/${encodeURIComponent(
          email
        )}`
      );
      const data = await response.json();

      if (response.ok) {
        const updatedUserData = {
          name: data.userName || "",
          email: email,
          bio: data.bio || "No bio added",
          profilePic: data.profilePic || defaultAvatar,
        };

        setUserData(updatedUserData);

        // Update localStorage
        localStorage.setItem("name", updatedUserData.name);
        localStorage.setItem("bio", updatedUserData.bio);
        localStorage.setItem("avatar", updatedUserData.profilePic);
      } else {
        console.error("Error fetching user data:", data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load on mount
  useEffect(() => {
    const email = localStorage.getItem("loggedin-user-email");
    if (email) {
      fetchUserData(email);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    const email = localStorage.getItem("loggedin-user-email");

    if (!email) {
      console.error("No email found");
      return false;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-user/${encodeURIComponent(
          email
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: updatedData.name,
            bio: updatedData.bio,
            profilePic: updatedData.profilePic,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Update context state
        const newUserData = {
          ...userData,
          name: updatedData.name,
          bio: updatedData.bio,
          profilePic: updatedData.profilePic,
        };

        setUserData(newUserData);

        // Update localStorage
        localStorage.setItem("name", updatedData.name);
        localStorage.setItem("bio", updatedData.bio);
        localStorage.setItem("avatar", updatedData.profilePic);

        console.log("User updated successfully:", data);
        return true;
      } else {
        console.error("Error updating user");
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  const value = {
    userData,
    loading,
    fetchUserData,
    updateUserProfile,
  };

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="/readmore-blog/:id"
            element={
              <PrivateRoute>
                <ReadMoreBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
