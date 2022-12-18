import React from "react";

const Like = ({ like, onLike }) => {
  return (
    <ion-icon
      onClick={onLike}
      style={{ color: "red" }}
      name={like ? "heart" : "heart-outline"}
      size="large"
    ></ion-icon>
  );
};

export default Like;
