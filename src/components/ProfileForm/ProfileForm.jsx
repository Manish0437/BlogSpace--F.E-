import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";

const ProfileForm = ({ setDisplayProfileForm }) => {
  const { userData, updateUserProfile } = useContext(UserContext);
  const [name, setName] = useState(userData.name || "");
  const [bio, setBio] = useState(userData.bio || "");
  const [profilePic, setProfilePic] = useState(userData.profilePic || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const handleClose = () => {
        setDisplayProfileForm(false);
    }

    const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await updateUserProfile({
      name,
      bio,
      profilePic,
    });

    setLoading(false);

    if (success) {
      setDisplayProfileForm(false);
    } else {
      setError("Failed to update profile. Please try again.");
    }
  };

    return (
        <div className="bg-white w-[60%] h-auto p-10 items-center rounded-3xl relative z-10">
            <button onClick={handleClose} className="absolute top-4 right-4"><RxCross2 /></button>
            <div className="flex flex-col items-start">
                <h1 className="text-2xl font-semibold mb-2">Edit Profile</h1>
                <p className="text-gray-500 text-xl mb-5">Update your profile information name, bio, and avatar.</p>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}


            <form onSubmit={handleSaveChanges}>
                <div className="flex flex-col justify-start mb-4">
                    <label htmlFor="name" className="self-start font-semibold mb-3">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} value={name} className="mb-3 bg-gray-300 rounded-md p-2 focus:outline-gray-400 focus:outline-2 focus:outline-offset-0 focus:border-1 focus:border-black"/>
                </div>
                <div className="flex flex-col justify-start mb-4">
                    <label htmlFor="bio" className="self-start font-semibold mb-3">Bio</label>
                    <textarea id="bio" name="bio" placeholder="Enter your bio" onChange={(e)=>setBio(e.target.value)} value={bio} className="mb-3 bg-gray-300 rounded-md p-2 focus:outline-gray-400 focus:outline-2 focus:outline-offset-0 focus:border-1 focus:border-black"></textarea>
                </div>
                <div className="flex flex-col justify-start mb-4">
                    <label htmlFor="profilePic" className="self-start font-semibold mb-3">Avatar URL</label>
                    <input type="text" id="profilePic" name="profilePic" placeholder="Enter your avatar URL" onChange={(e)=>setProfilePic(e.target.value)} value={profilePic} className="mb-3 bg-gray-300 rounded-md p-2 focus:outline-gray-400 focus:outline-2 focus:outline-offset-0 focus:border-1 focus:border-black"/>
                </div>
                <div className="flex items-center gap-3">
                    <button type="submit" className="bg-black py-[10px] w-[90%] text-white font-semibold rounded-md box-border" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                    <button type="button" onClick={handleClose} className="bg-gray-200 text-black rounded-md border-2 border-gray-200 py-[10px] box-border font-semibold px-2" disabled={loading}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default ProfileForm;