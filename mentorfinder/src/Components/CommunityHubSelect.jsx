import { computeHeadingLevel } from "@testing-library/react";
import React, { useState, useEffect } from "react";

const CommunityHubSelect = () => {
  const userId = localStorage.getItem("userId");
  const typeOfUser = localStorage.getItem("userType");

  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const hubId = "64503200584ff630f60bac3e";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/communityHubSpace/${hubId}`);
      const result = await response.json();
      console.log(`Api returns ${typeof result.data}`);
      console.log(`Api returns ${result.data[0]}`);

      setPosts(result.data);
    };

    fetchData();
  }, [typeOfUser, userId]);

  const handlePostSubmit = () => {
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newPostText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewPostText("");
        setPosts([data, ...posts]);
      });
  };

  if (!posts) {
    //console.log(posts);

    return <div>Loading...</div>;
  } else {
    console.log("posts fetching complete");
    console.log(`POST VALUS IS SET TO ${Object.keys(posts)}`);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Write a post..."
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
            <p>
              {post.date} {post.time}
            </p>
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
