import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import Post from "./Post";

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery(["post"], () =>
    axios
      .get(`${import.meta.env.VITE_API_URL}/post?userId=${userId}`)
      .then((res) => {
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

Posts.propTypes = {
  userId: PropTypes.number,
};

Posts.defaultProps = {
  userId: undefined,
};

export default Posts;
