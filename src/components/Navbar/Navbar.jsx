import { CiPen } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { LiaUserSolid } from "react-icons/lia";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";
import { TbLogout2 } from "react-icons/tb";

const defaultAvatar = "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";

const Navbar = () => {
  const context = useContext(UserContext);
  const userData = context?.userData || {};
  const location = useLocation();
  const [displayNavContainer, setDisplayNavContainer] = useState(false);


  const getActiveSectionFromRoute = () => {
    switch (location.pathname) {
      case "/":
        return "feed";
      case "/create-blog":
        return "create-blog";
      case "/profile":
        return "profile";
      default:
        return "feed";
    }
  };
  const activeSection = getActiveSectionFromRoute();

  const changeNavContainer = () => {
    setDisplayNavContainer(!displayNavContainer);
  };

  const changeActiveSectionHandler = (section) => {
    setActiveSection(section);
  };

  const avatarUrl =  userData?.profilePic && userData.profilePic.trim() !== "" ? userData.profilePic
      : defaultAvatar;


  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>

      {/* For small screens */}
      <nav className="text-black flex items-center justify-between border-b-2 border-gray-300 py-5 lg:hidden">
        <h1 className="text-[15px] md:text-[20px] bg-white text-black flex items-center ml-5">
          <CiPen className="bg-black text-white p-1 rounded-xl mr-2 text-[28px] md:text-[32px]" />
          BlogSpace
        </h1>

        <button
          className="mr-5 hover:bg-gray-400 p-2 rounded-md"
          onClick={() => changeNavContainer()}
        >
          <RxHamburgerMenu className="text-[18px] md:text-[22px]" />
        </button>
        {displayNavContainer && (
          <>
            <div
              className="fixed top-[0px] left-[0px] w-[100%] h-[100%] z-5 bg-black/50"
              onClick={() => changeNavContainer()}
            ></div>
            <div className="fixed w-[48%] md:w-[40%] h-screen top-[0px] right-[0px] bottom-[0px] bg-white z-10 pt-2 overflow-y-auto">
              <button
                className="absolute right-[5px] text-gray-600 hover:text-black text-[13px] md:text-[22px] border-2 border-gray-300 rounded-md"
                onClick={() => changeNavContainer()}
              >
                <RxCross2 />
              </button>
              <div className="flex flex-row justify-start items-center">
                <img
                  src={avatarUrl}
                  alt="Profile Pic"
                  className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full md:ml-2 object-cover flex-shrink-0"
                  onError={(e)=> {
                    e.target.src=defaultAvatar;
                  }}
                />
                <div className="flex flex-col items-start ml-2">
                  <h1 className="text-[15px] md:text-[22px] font-semibold mt-2">
                    {userData?.name || "User"}
                  </h1>
                  <p className="text-[12px] mb-5 text-gray-500 flex-wrap">
                    {userData?.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 relative top-[0px]">
                <Link
                  to="/"
                  className={`flex items-center text-[12px] md:text-[20px] hover:bg-gray-300 hover:rounded-2xl ${
                    activeSection === "feed" ? "active-nav-element" : ""
                  }`}
                  onClick={() => {
                    changeNavContainer();
                  }}
                >
                  <IoHomeOutline className="mr-2 ml-3" />
                  Feed
                </Link>
                <Link
                  to="/create-blog"
                  className={`flex items-center text-[12px] md:text-[20px] hover:bg-gray-300 hover:rounded-2xl ${
                    activeSection === "create-blog" ? "active-nav-element" : ""
                  }`}
                  onClick={() => {
                    changeNavContainer();
                  }}
                >
                  <CiPen className="mr-2 ml-3" />
                  Create Blog
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center text-[12px] md:text-[20px] hover:bg-gray-300 hover:rounded-2xl ${
                    activeSection === "profile" ? "active-nav-element" : ""
                  }`}
                  onClick={() => {
                    changeNavContainer();
                  }}
                >
                  <LiaUserSolid className="mr-2 ml-3" />
                  Profile
                </Link>
                <button type="button" onClick={()=> {handleLogout();}} className="flex items-center text-[12px] md:text-[20px] hover:bg-gray-300 hover:rounded-2xl ml-3 mb-5">
                  <TbLogout2 className="mr-2" /> Logout
                </button>
              </div>
            </div>
          </>
        )}
      </nav>




      {/* For large screens */}

      <nav className="text-black hidden lg:flex items-center justify-between border-b-2 border-gray-300 py-5">
        <h1 className="text-[25px] bg-white text-black flex items-center ml-5">
          <CiPen className="bg-black text-white p-2 rounded-xl mr-2 text-[50px]" />
          BlogSpace
        </h1>

        <div className="grid grid-cols-3 w-[50%] gap-6 items-center">
          <Link
            to="/"
            className={`flex items-center text-[23px] hover:bg-gray-300 hover:px-[17px] hover:py-[8px] hover:rounded-2xl justify-center ${
              activeSection === "feed" ? "active-nav-element" : ""
            }`}
            onClick={() => changeActiveSectionHandler("feed")}
          >
            <IoHomeOutline className="mr-2" /> Feed
          </Link>
          <Link
            to="/create-blog"
            className={`flex items-center text-[23px] hover:bg-gray-300 hover:px-[17px] hover:py-[8px] hover:rounded-2xl justify-center ${
              activeSection === "create-blog" ? "active-nav-element" : ""
            }`}
            onClick={() => changeActiveSectionHandler("create-blog")}
          >
            <CiPen className="mr-2" />
            Create Blog
          </Link>
          <Link
            to="/profile"
            className={`flex items-center text-[23px] hover:bg-gray-300 hover:px-[17px] hover:py-[8px] hover:rounded-2xl justify-center ${
              activeSection === "profile" ? "active-nav-element" : ""
            }`}
            onClick={() => changeActiveSectionHandler("profile")}
          >
            <LiaUserSolid className="mr-2" /> Profile
          </Link>
        </div>

        <h1 className="text-xl flex items-center mr-15 gap-3">
          <img
            src={avatarUrl}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt="profile-pic"
          />
          <span>{userData?.name || "User"}</span>

          <button type="button" onClick={()=> {handleLogout();}} className="text-2xl ml-3" title="Logout">
            <TbLogout2 />
          </button>
        </h1>
      </nav>
    </>
  );
};
export default Navbar;
