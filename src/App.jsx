import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data.slice(0, 20)); // Limit to 20 posts
      })
      .catch((err) => console.log("Error fetching posts:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      userId: 1,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((res) => {

        setPosts([res.data, ...posts]);
        setTitle("");
        setBody("");
      })
      .catch((err) => console.log("Error creating post:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <br />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Add Post</button>
      </form>

      <ol>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
