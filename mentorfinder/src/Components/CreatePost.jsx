// import "./CommunityHubPosts.scss";
// import "Upvote.js";
// import "Downvote.js";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = uesState("false");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/createPost/${userId}`);
      const result = await response.json();
    };
    fetchData();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };

    setIsPending(true);

    fetch("https://localhost5000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      console.log("new post added");
      setIsPending(false);
    });
  };
  return (
    <>
      <form onSubmit={{ handleSubmit }}>
        <label htmlFor="title"></label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body"></label>
        <input
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {!isPending && <button> Create Post </button>}
        {isPending && <button disabled> Creating post... </button>}
      </form>
    </>
  );
};

export default Post;
