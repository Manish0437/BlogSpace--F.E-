import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard.jsx";

const Feed = () => {
  const [blogsList, setBlogsList] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchtext, setSearchtext] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/all-posts`);
        const data = await response.json();
        setBlogsList(data);
        setAllBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  },[]);

  const getSearchResults = (query) => {
    if (query.trim() === "") {
      setBlogsList(allBlogs);
      return;
    }

    const results = allBlogs.filter((blog) => 
      blog.title.toLowerCase().includes(query.toLowerCase()) || 
      blog.content.toLowerCase().includes(query.toLowerCase()) || 
      blog.blogUserName.toLowerCase().includes(query.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setBlogsList(results);
  };

  const handleSearchText = (e) => {
    const value = e.target.value;
    setSearchtext(value);
    getSearchResults(value);
  };

  return (
    <div className="mt-8 text-left w-[85%] m-auto">
      <h1 className="text-xl font-semibold md:text-3xl md:font-bold">Blog Feed</h1>
      <p className="mt-4 text-gray-500 text-[15px] md:text-[22px]">
        Discover amazing stories and insights from our community
      </p>

      {/* <div className="bg-gray-200 w-full mt-10 flex items-center gap-3 p-2 md:p-3 rounded-lg">
        <CiSearch className="text-gray-600 w-[20px] h-[20px] md:w-[25px] md:h-[25px]" />
        <p className="text-gray-600 text-[12px] md:text-[20px]">
          Search blogs, authors, or content...
        </p>
      </div> */}

      
      <div className="bg-gray-200 w-full mt-10 flex items-center gap-3 p-2 md:p-3 rounded-lg">
        <CiSearch className="text-gray-600 w-[20px] h-[20px] md:w-[25px] md:h-[25px]" />
        <input type="text" placeholder="Search blogs, authors, or content..." className="bg-transparent outline-none flex-1 text-gray-600 text-[12px] md:text-[20px]" value={searchtext} onChange={handleSearchText} name="search" />
      </div>

      {blogsList.length === 0 ? (
        <p className="mt-10 text-gray-500 text-[20px]">
          No blogs available. Create the first blog post!
        </p>
      ) : (
        blogsList.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default Feed;
