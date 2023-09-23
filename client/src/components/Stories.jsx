import React from "react";

function Stories() {
  const stories = [
    {
      id: 1,
      username: "audre",
      img: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      username: "audre",
      img: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      username: "audre",
      img: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];
  return (
    <div className="stories">
      {stories.map((story) => (
        <div key={story.id} className="story">
          <img src={story.img} alt="" />
          <span>{story.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
