import React, { useState, useEffect } from "react";

const CommunityHubSelect = (props) => {
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");

  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const hubId = "64503200584ff630f60bac3e";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/communityHubSpace/${hubId}`);
      const result = await response.json();
      setPosts(result.data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  const handlePostSubmit = () => {
    fetch("/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newPostTitle,
        text: newPostText,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewPostText("");
        setNewPostTitle("");
        setPosts([data, ...posts]);
      });
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          id="post-title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="post-text">Text:</label>
        <input
          type="text"
          id="post-text"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <button onClick={handlePostSubmit}>Post</button>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.authorId}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{/* {post.date} {post.time} */}</p>
            <p>{post.authorFullName}</p>
            <p>{post.numUpvotes} Upvotes</p>
            <p>{post.numDownvotes} Downvotes</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHubSelect;
