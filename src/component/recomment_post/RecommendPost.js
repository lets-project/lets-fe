import React, { useEffect, useState } from "react";
import "./RecommendPost.css";
import { useSelector } from "react-redux";
import studyService from "service/study_service";
import RecommendPostLi from "../recommend_post_li/RecommendPostLi";

const RecommendPost = ({ id, tags }) => {
  const nickname = useSelector((state) => state.user.nickname);
  const [recommendPostList, setRecommendPostList] = useState([]);
  useEffect(async () => {
    const response = await studyService.getRecommendedPost(id, tags);
    setRecommendPostList(response);
  });

  return (
    <div className="TotalWrapper">
      <div className="recommendWrapper">
        <div className="userInfoWrapper">
          <div className="recommendPostBar"></div>
          <div className="recommendPostUserInfo">
            <span className="recommendPostUserName">
              {nickname == undefined ? "방문자" : nickname}
            </span>
            님이
            <br />
            좋아하실 글을 모아봤어요!
          </div>
        </div>
        <div className="recommendPostListWrapper">
          {recommendPostList.map((v, i) => {
            return (
              <RecommendPostLi i={i + 1} title={v.title}></RecommendPostLi>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendPost;
