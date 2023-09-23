import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr";
import ReactTimeAgo from "react-time-ago";
import { AuthContext } from "../contexts/authContext";

TimeAgo.addLocale(fr);

function Comments({ postId }) {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, data } = useQuery(["comment"], () =>
    axios
      .get(`${import.meta.env.VITE_API_URL}/comment?postId=${postId}`)
      .then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comment/addcomment`,
        newComment,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comment"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </div>
      {isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                <ReactTimeAgo
                  date={new Date(comment.createdAt)}
                  relocale="fr"
                />
              </span>
            </div>
          ))}
    </div>
  );
}
Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};
export default Comments;
