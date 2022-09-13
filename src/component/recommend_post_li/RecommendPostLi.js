import React from "react";
import "./RecommendPostLi.css";

const RecommendPostLi = (props) => {
  return (
    <>
      <li
        className="recommendPostLiWrapper"
        onClick={() => {
          window.location.href = `/study/${props.id}`;
        }}
      >
        <div className="recommendPostLiIndex">{props.i}.</div>
        <div className="recommendPostLiTitle">{props.title}</div>
      </li>
    </>
  );
};

export default RecommendPostLi;
