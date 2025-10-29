import BlogCard from "../BlogCard/BlogCard.jsx";

const MyBlogs = ({ myBlogsList }) => {

  return (
    <div className="">
      <h1 className="text-xl md:text-3xl font-bold mb-4">My Blog Posts</h1>
      <p className="text-gray-500 text-[15px]md:text-[22px]">Manage your published content</p>

      <div className="flex flex-col items-center">
        {Array.isArray(myBlogsList) && myBlogsList.length > 0 ? (
          myBlogsList.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-gray-500 mt-4">
            No blogs found or failed to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
