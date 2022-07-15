import React, { useEffect, useState } from "react";
import studyService from "service/study_service";
import styles from "./likesAndViews.module.css";

/* 
좋아요수와 조회수를 보여주는 component입니다.
todo
*/

const LikesAndViews = ({ viewCount, likeCount, isLikedPost, postId }) => {
  const [likeImg, setLikeImg] = useState(
    isLikedPost ? "heart_filled" : "heart_unfilled"
  );
  const [likes, setLikes] = useState(likeCount);
  console.log(isLikedPost);
  const handleLikesClick = async () => {
    const response = await studyService.clickedLikes(postId);
    isLikedPost = response.data.likePostStatus == "ACTIVE";
    setLikeImg(isLikedPost ? "heart_filled" : "heart_unfilled");
    setLikes(isLikedPost ? likes + 1 : likes - 1);
  };

  return (
    <>
      <section className={styles.likesAndViewsWrapper}>
        <div className={styles.likes}>
          <img
            onClick={handleLikesClick}
            className={styles.itemImg}
            src={`/images/info/${likeImg}.png`}
            alt="likes"
          />
          <p>{likes}</p>
        </div>
        <div className={styles.views}>
          <img
            className={styles.eyeImg}
            src="/images/info/eye.png"
            alt="views"
          />
          <p>{viewCount}</p>
        </div>
      </section>
    </>
  );
};

export default LikesAndViews;
