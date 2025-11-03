import { LuSettings } from "react-icons/lu";
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";


const Settings = () => {
    const context = useContext(UserContext);

    const handleAcceptDeleteAccount = async () => {
    try {
        const userEmail = context?.userData?.email;
        const commentUserName = context?.userData?.name;
        const postUserName = context?.userData?.name;
        
        if (!userEmail) {
            console.error("User email not found");
            return;
        }

        // Delete user blogs
        const blogsResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/blogs/user/${postUserName}`,
            { method: 'DELETE' }
        );
        if (!blogsResponse.ok) {
            throw new Error('Failed to delete user blogs');
        }
        console.log("User blogs deleted successfully");

        // Delete user comments
        const commentsResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/comments/user/${commentUserName}`,
            { method: 'DELETE' }
        );
        if (!commentsResponse.ok) {
            throw new Error('Failed to delete user comments');
        }
        console.log("User comments deleted successfully");

        // Delete account
        const accountResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/delete-user/${userEmail}`,
            { method: 'DELETE' }
        );
        if (!accountResponse.ok) {
            throw new Error('Failed to delete account');
        }
        console.log("Account deleted successfully");

        // Clear storage and redirect only on success
        localStorage.clear();
        window.location.href = '/login';

    } catch (error) {
        console.error("Error deleting account:", error);
        // Show user-friendly error message (e.g., toast/alert)
        alert(`Failed to delete account: ${error.message}`);
    }
};

    const handleDeleteAccount = () => {
        // Confirmation before deletion
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Proceed with account deletion
            handleAcceptDeleteAccount();
        }
    };

    return (
        <div className="border-2 border-gray-300 rounded-2xl p-5 flex flex-col justify-start">
            <h1 className="text-2xl mb-4 flex items-center"><LuSettings className="text-3xl mr-3"/>Account Settings</h1>
            <p className="text-left font-bold mt-2 text-[22px]">Email Address</p>
            <p className="text-left text-gray-500 mt-3 text-[22px]">{context?.userData?.email}</p>
            <hr className="border-gray-500 mt-4" />
            <h1 className="text-2xl mt-3 text-left">Danger Zone</h1>
            <p className="text-left text-gray-500 mt-2 text-[16px]">Permanently delete your account and all associated data</p>
            <button type="button" className="text-white bg-red-300 py-3 px-4 rounded-2xl w-fit mt-4 text-[20px] font-bold" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    )
}

export default Settings;