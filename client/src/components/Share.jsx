import React, { useState, useContext } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import img from "../assets/img.png";
import map from "../assets/map.png";
import friend from "../assets/friend.png";
import { AuthContext } from "../contexts/authContext";

function Share() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  async function upload() {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData
      );
      return res.data;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return axios.post(
        `${import.meta.env.VITE_API_URL}/post/addpost`,
        newPost,
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc(""); // ici permet d'effacer le contenu du post et de l'img pour pouvoir en éditer un autre
    setFile(null);
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="Pic" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.username}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={img} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={map} alt="map" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} type="submit">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
