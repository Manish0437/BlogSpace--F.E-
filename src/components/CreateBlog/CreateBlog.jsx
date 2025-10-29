import { LuSave } from "react-icons/lu";
import {useState} from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [tagsList, setTagsList] = useState([]);
    const [title,setTitle]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [content,setContent]=useState("");

    const navigate=useNavigate();


    // Handles adding a new tag when Enter is pressed
    const handleTagInputKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (newTag && !tagsList.includes(newTag)) {
                setTagsList((prevTags) => [...prevTags, newTag]);
                e.target.value = "";
            }
        }
    };

    // Handles removing a tag by index
    const handleRemoveTag = (index) => {
        setTagsList((prevTags) => {
            // Remove the tag at the given index
            return prevTags.filter((tag, i) => i !== index);
        });
    };


    const submitForm=async(e)=>{
        e.preventDefault();
        try {
            const blogData={
                blogUserName: localStorage.getItem("name") || "Anonymous",
                blogUserPic: localStorage.getItem("avatar") || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
                title,
                imageUrl,
                content,
                tags: tagsList
            };


            const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/add-post`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(blogData)
            });

            if(response.ok){
                const data=await response.json();
                console.log("Blog created successfully:", data);
            }else{
                console.error("Error creating blog:", response.statusText);
            }

            // Reset form fields
            setTitle("");
            setImageUrl("");
            setContent("");
            setTagsList([]);
            navigate("/",{replace:true});
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    }

    return (
        <div className="flex flex-col items-center">
        <form className="border border-gray-600 rounded-2xl mt-8 p-8 w-[85%] h-auto" onSubmit={submitForm}>
            <h1 className="flex items-center mb-8"><LuSave className="mr-2"/> Create New Blog Post</h1>
            <label htmlFor="title" className="font-bold text-left block mb-2">Title *</label>
            <input type="text" id="title" name="title" required placeholder="Enter blog title" className="bg-[rgba(0,0,0,0.1)] w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 focus:shadow-[0_0_8px_2px_gray] focus:border-2 focus:border-gray-500" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="imageUrl" className="font-bold text-left block mb-2">Featured Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter image URL" className="bg-[rgba(0,0,0,0.1)] w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 focus:shadow-[0_0_8px_2px_gray] focus:border-2 focus:border-gray-500" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <label htmlFor="content" className="font-bold text-left block mb-2">Content *</label>
            <textarea id="content" name="content" required placeholder="Write your blog content here..." rows="10" className="bg-[rgba(0,0,0,0.1)] w-full p-3 border border-gray-300 rounded-lg mt-2 mb-4 focus:outline-gray-600" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <label htmlFor="tags" className="font-bold text-left block mb-2">Tags</label>
            <input
                type="text"
                id="tags"
                name="tags"
                placeholder="e.g. technology, programming"
                className="bg-[rgba(0,0,0,0.1)] w-full p-3 border border-gray-300 rounded-lg mt-2 mb-6 focus:outline-gray-600"
                onKeyDown={handleTagInputKeyDown}
            />
            <div className="my-4 flex flex-wrap">
                {tagsList.map((tag, index) => (
                    <span key={index} className="inline-block bg-black text-white text-sm px-3 py-3 rounded-xl mr-2 mb-2">
                        {tag}
                        <button type="button" className="ml-2 text-white" onClick={() => handleRemoveTag(index)}>
                            <RxCross2 />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex items-center mb-6">
                <button type="submit" className="w-full bg-black font-bold text-white px-2 py-3 rounded-lg hover:bg-gray-700 transition duration-300">Publish Blog</button>
                <button className="w-auto px-6 py-3 font-bold text-black rounded-lg ml-4 border-2 border-gray-300">Cancel</button>
            </div>
        </form>
        </div>
    )
}

export default CreateBlog;