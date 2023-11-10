import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Post from "./Post";

function Posts() {
  const { isLoading, error, data } = useQuery(["post"], () =>
    axios.get(`${import.meta.env.VITE_API_URL}/post`).then((res) => {
      return res.data;
    })
  );

  if (error) {
    return "Something went wrong !";
  }

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="posts">
      {data.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
