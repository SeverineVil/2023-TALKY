import React from "react";
import Share from "../components/Share";
import Stories from "../components/Stories";
import Posts from "../components/posts/Posts";

function Home() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default Home;
