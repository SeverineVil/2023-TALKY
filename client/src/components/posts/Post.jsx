import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";
import ReactTimeAgo from "react-time-ago";
import Comments from "../Comments";

TimeAgo.addDefaultLocale(fr);
TimeAgo.addLocale(fr);

function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/likes/${post.id}`)
      .then((res) => {
        const likesCount = res.data;
        setLikes(likesCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [post.id]);

  const handleDelete = async (id) => {
    console.warn(id);
    await axios
      .delete(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then((res) => {
        if (res.status === 204) {
          console.warn("Post supprimé avec succès");
        } else {
          console.error("La suppression a échoué");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes + 1 : likes - 1);
    // Send a POST request to your server to record the like
    axios
      .put(`${import.meta.env.VITE_API_URL}/likes/${post.id}`, {
        liked: !liked,
      })
      .catch((error) => {
        console.error("Error from server:", error);
        // Revert the local state if the server request fails
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      });
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`}>
                <span className="name">
                  {post.username} {post.id}
                </span>
              </Link>
              <span className="date">
                <ReactTimeAgo date={new Date(post.createdAt)} relocale="fr" />
              </span>
            </div>
          </div>
          <MoreHorizIcon />
          <button type="submit" onClick={() => handleDelete(post.id)}>
            delete
          </button>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={`upload/${post.img}`} alt="" />}
        </div>
        <div className="info">
          <div className="item" role="presentation" onClick={handleLike}>
            {liked ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            {likes} likes
          </div>
          <div
            className="item"
            role="presentation"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    img: PropTypes.string,
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
