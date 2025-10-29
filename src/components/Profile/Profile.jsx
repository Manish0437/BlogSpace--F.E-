import { useState, useEffect } from "react";
import { TbEdit } from "react-icons/tb";
import { PiBookOpenBold } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import MyBlogs from "../MyBlogs/MyBlogs.jsx";
import Settings from "../SettingComponent/Settings.jsx";
import ProfileForm from "../ProfileForm/ProfileForm.jsx";
import UserContext from "../../context/UserContext.js";
import { useContext } from "react";


const defaultAvatar = "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";



const Profile = () => {
  const { userData } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("my-blogs");
  const [displayProfileForm, setDisplayProfileForm] = useState(false);
  const [myBlogsList, setmyBlogsList] = useState([]);
  const [blogsCount, setBlogsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [firstBlogCreatedAt, setFirstBlogCreatedAt] = useState(null);


  const getCreatedAtFormatted = (createdAt) => {
    if (!createdAt) return "N/A";
    const dateObject = new Date(createdAt);
    const year = dateObject.getFullYear();
    return year;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!userData.name) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/user/${userData.name}`
        );
        const data = await response.json();
        console.log("Fetched blogs:", data);
        const firstBlogData = data[0];
        // setFirstblogcreatedAt(firstBlogData ? firstBlogData.createdAt : null);
        // console.log("First blog created at:", firstBlogData.createdAt);

        setFirstBlogCreatedAt(
          getCreatedAtFormatted(firstBlogData ? firstBlogData.createdAt : null)
        );

        const response2 = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/user/comments/${userData.name}`
        );
        const data2 = await response2.json();
        console.log("Fetched comments:", data2);
        setCommentsCount(data2.length);

        // Check if response was successful
        if (!response.ok) {
          console.error("Server error:", data.error || "Unknown error");
          setmyBlogsList([]);
          setBlogsCount(0);
          return;
        }

        if (Array.isArray(data)) {
          setmyBlogsList(data);
          setBlogsCount(data.length);
          const firstBlogData = data[0];
          setFirstBlogCreatedAt(
            getCreatedAtFormatted(
              firstBlogData ? firstBlogData.createdAt : null
            )
          );
        } else {
          console.error("Unexpected data format:", data);
          setmyBlogsList([]);
          setBlogsCount(0);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setmyBlogsList([]);
        setBlogsCount(0);
      }
    };
     const fetchComments = async () => {
      if (!userData.name) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/user/comments/${userData.name}`
        );
        const data = await response.json();
        console.log("Fetched comments:", data);
        if (Array.isArray(data)) {
          setCommentsCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchBlogs();
    fetchComments();
  }, [userData.name]);

  const handleEditProfile = () => {
    setDisplayProfileForm(true);
  };


  const handleCloseProfileForm = () => {
    setDisplayProfileForm(false);
  };



  const handleImageError = (e) => {
    e.target.src = defaultAvatar;
  };

  const displayBio = userData.bio && userData.bio.trim() !== "" ? userData.bio : "No bio added";

  return (
    <div className="w-[85%] h-auto py-[20px] m-auto">
      {/* For large screens */}
      <div className="hidden md:flex items-center border-2 border-gray-300 rounded-2xl relative m-auto p-[15px]">
        <img
          src={userData.profilePic}
          alt="profile-pic"
          className="w-[70px] h-[70px] md:w-[130px] md:h-[130px] rounded-full"
           onError={handleImageError}
        />

        <div className="flex flex-col items-start ml-8">
          <h1 className="text-lg md:text-3xl font-bold mb-4">
            {userData.name}
          </h1>
          <p className="text-md md:text-xl mb-4 text-gray-500">
            {userData.email}
          </p>
          <p className="text-md md:text-xl">{displayBio}</p>
        </div>

        <button
          className="border-2 border-gray-300 py-3 px-4 rounded-xl ml-4 items-center flex font-bold absolute right-[50px] top-[40px] text-xl"
          onClick={handleEditProfile}
        >
          <TbEdit className="mr-2 font-bold w-8 h-8" /> Edit Profile
        </button>
      </div>

      {/* For small screens */}
      <div className="flex md:hidden flex-wrap items-center border-2 border-gray-300 rounded-2xl relative m-auto p-[15px]">
        <img
          src={
            userData.profilePic
          }
          alt="profile-pic"
          className="w-[70px] h-[70px] rounded-full"
          onError={handleImageError}
        />

        <div className="flex flex-col items-start ml-2 justify-items-start text-left w-[65%]">
          <h1 className="text-lg md:text-3xl font-bold mb-4">
            {userData.name}
          </h1>
          <p className="text-md md:text-xl mb-4 text-gray-500">
            {userData.email}
          </p>
          <p className="text-md md:text-xl">{displayBio}</p>
        </div>

        <button
          className="border-2 border-gray-300 py-3 px-4 rounded-xl ml-4 items-center flex font-bold text-md w-full mt-4 justify-center"
          onClick={handleEditProfile}
        >
          <TbEdit className="mr-2 font-bold w-5 h-5" /> Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5 items-center mt-8 m-auto">
        <div className="flex items-center border-2 border-gray-300 rounded-xl p-3 h-[100%] md:text-left">
          <PiBookOpenBold className="w-[20px] h-[20px] md:w-[40px] md:h-[40px] bg-gray-300 rounded-full p-3 box-content" />
          <div className="flex flex-col items-start ml-4">
            {/* <h1 className="text-3xl font-bold mb-2">{localStorage.getItem("blogsCount") || 0}</h1> */}
            <h1 className="text-xl md:text-3xl font-bold mb-2">{blogsCount}</h1>
            <p className="text-md md:text-xl mb-4 text-gray-500">Blog Posts</p>
          </div>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-xl p-3 h-[100%] md:text-left">
          <LuUser className="w-[20px] h-[20px] md:w-[40px] md:h-[40px] bg-green-100 rounded-full p-3 box-content text-green-600" />
          <div className="flex flex-col items-start ml-4">
            <h1 className="text-xl md:text-3xl font-bold mb-2">
              {commentsCount}
            </h1>
            <p className="text-md md:text-xl mb-4 text-gray-500">
              Total Comments
            </p>
          </div>
        </div>
        <div className="flex items-center border-2 border-gray-300 rounded-xl p-3 h-[100%] md:text-left">
          <LuCalendar className="w-[20px] h-[20px] md:w-[35px] md:h-[38px] bg-blue-100 rounded-full p-3 box-content text-blue-700 text-[20px]" />
          <div className="flex flex-col items-start ml-4">
            <h1 className="text-xl md:text-3xl font-bold mb-2">
              {firstBlogCreatedAt}
            </h1>
            <p className="text-md md:text-xl mb-4 text-gray-500">
              Member Since
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-gray-300 p-1 m-auto mt-8 box-content">
        <button
          className={`${
            activeSection === "my-blogs"
              ? "text-[15px] md:text-[20px] bg-white rounded-3xl w-[50%] text-black font-[600] py-2 box-content"
              : "w-[50%] font-[600] text-[15px] md:text-[20px]"
          }`}
          onClick={() => setActiveSection("my-blogs")}
        >
          My Blogs
        </button>
        <button
          className={`${
            activeSection === "settings"
              ? "text-[15px] md:text-[20px] bg-white rounded-3xl w-[50%] text-black font-[600] py-2 box-content"
              : "w-[50%] font-[600] text-[15px] md:text-[20px]"
          }`}
          onClick={() => setActiveSection("settings")}
        >
          Settings
        </button>
      </div>
      <div className="m-auto mt-8">
        {activeSection === "my-blogs" ? (
          <MyBlogs myBlogsList={myBlogsList} />
        ) : (
          <Settings />
        )}
      </div>

      {displayProfileForm === true && (
        <div className="inset-0 w-screen h-screen bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-1 flex justify-center items-center">
          <ProfileForm setDisplayProfileForm={handleCloseProfileForm} />
        </div>
      )}
    </div>
  );
};

export default Profile;
