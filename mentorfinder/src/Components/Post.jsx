// import "Upvote.js";
// import "Downvote.js";
import { Link } from "react-router-dom";

const CreatePost = ({ post }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body, author };
    fetch("http://localhost:5000/communityhub", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    }).then(() => {
      console.log("new post added");
    });
  };
  return (
    <div className="create">
      <h2>New Post</h2>
      <form onSubmit={{ handleSubmit }}></form>
      <div className="communityHubPost">
        <div classname="container">
          <div className="user">
            <div className="userInfo"></div>
            <img src={postMessage.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span classname="name"> {post.name}</span>
              </Link>
              <span className="date"> </span>
            </div>
          </div>
          <div className="title"></div>
          <div className="content">
            <img src={post.img} alt="" />"
          </div>
          <div className="info"></div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
