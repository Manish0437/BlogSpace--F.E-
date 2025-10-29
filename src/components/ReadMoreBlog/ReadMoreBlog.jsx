import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ReadMoreBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({ tags: [] });

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
        const data = await response.json();
        setBlog(data.blog);
        console.log("Fetched blog data:", data);
        setComments(data.comments);
        setNumberOfComments(data.comments.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id, numberOfComments]);

  const showPostComment = () => {
    setShowComments((prevShowComments) => !prevShowComments);
    // reload the page
  };

  const postComment = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          userName: localStorage.getItem("name"),
          userPic: localStorage.getItem("avatar"),
        }),
      }
    );
    window.location.reload();
  };

  const getCreatedAtFormatted = (createdAt) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(createdAt).toLocaleDateString("en-US", options);
  };

  return (
    <div
      key={id}
      className="mt-10 flex justify-start flex-col w-[80%] m-auto"
    >
        <button type="button" className="border border-gray-400 rounded-xl px-3 py-2 hover:bg-gray-200 flex items-center w-fit" onClick={() => window.history.back()}>
            <span className="flex flex-row justify-start items-center w-auto"><IoArrowBack className="mr-2"/> Back to Feed</span>
        </button>
        <h1 className="text-2xl md:text-4xl mt-4 text-left">
        {blog.title}
      </h1>
      <div className="flex items-center gap-4 mb-4 mt-4">
        <img
          src={blog.blogUserPic}
          className="w-[40px] h-[40px] rounded-full md:w-[60px] md:h-[60px]"
        />
        <div className="flex items-start flex-col">
          <h1 className="text-md font-bold md:text-2xl">{blog.blogUserName}</h1>
          <div className="flex items-center gap-2">
            <CiCalendar className="w-4 h-4 text-gray-500 md:w-5 md:h-5" />
            <p className="text-gray-500 text-xs md:text-sm">
              {getCreatedAtFormatted(blog.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex">
        {blog.tags &&blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-black py-2 px-3 rounded-full text-[12px] mr-2 font-bold md:text-[15px] md:font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-40 object-fill rounded-3xl mt-5 md:h-80"
        />
      )}
      <p
        className="mt-4 text-black text-left text-sm md:text-md"
      >
        {blog.content}
      </p>
      <div className="border border-gray-400 rounded-2xl mt-10 p-6">
        <div className="flex items-center">
            <button
            className="flex items-center hover:bg-gray-200 cursor-pointer w-auto px-3 py-3 rounded-2xl mr-10"
            onClick={showPostComment}
            >
            <FaRegComment className="w-4 h-4 text-black md:w-5 md:h-5" />
            <p className="text-black text-xs md:text-sm ml-2 font-semibold flex items-center">
                Comments ({numberOfComments})
            </p>
            </button>
        </div>

        {showComments && (
            <div className="flex items-start gap-4 mt-4">
            <img
                src={
                `${localStorage.getItem("avatar")}` ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"
            />
            <div className="flex flex-col justify-start w-[100%]">
                <textarea
                placeholder="Write a comment..."
                className="w-full bg-gray-100 rounded-2xl p-4 resize-none focus:outline-6 focus:outline-offset-0 focus:outline-solid focus:outline-gray-300 focus:border-2 focus:border-black text-[12px] md:text-[15px]"
                rows="4"
                onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div className="flex items-center mt-8">
                <button
                    className="text-white bg-black font-semibold px-3 py-2 rounded-2xl mr-5 text-[12px] md:text-[15px] flex items-center md:px-5 md:py-3"
                    onClick={postComment}
                >
                    Post Comment
                </button>
                <button
                    className="text-black border border-gray-300 px-3 py-2 md:px-5 md:py-3 rounded-2xl text-[12px] md:text-[15px] font-semibold hover:bg-gray-200"
                    onClick={() => setShowComments(false)}
                >
                    Cancel
                </button>
                </div>
            </div>
            </div>
        )}

        <hr className="mb-4 border border-gray-300 mt-4" />

        {comments.length > 0 &&
            comments.map((comment) => (
            <div key={comment._id} className="flex items-start gap-4 mt-10">
                <img
                src={
                    comment.userPic ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                }
                className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full"
                />
                <div className="flex flex-col justify-start w-[100%] bg-gray-200 rounded-2xl p-4">
                <div className="flex items-center w-[100%] gap-2">
                    <h1 className="text-sm md:text-lg font-bold">
                    {comment.userName}
                    </h1>
                    <p className="text-gray-600 text-[12px] md:text-[15px]">
                    {getCreatedAtFormatted(comment.createdAt)}
                    </p>
                </div>
                <p className="mt-4 text-black text-left text-[12px] md:text-[15px]">
                    {comment.text}
                </p>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default ReadMoreBlog;
