import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import studyService from "service/study_service";
// import { setModalVisible } from "store/loginStep";
// import LoginModal
import Modal from "../modal/modal_component/modal";
import styles from "./likesAndViews.module.css";

/* 
좋아요수와 조회수를 보여주는 component입니다.
todo
*/

const LikesAndViews = ({ viewCount, likeCount, studyId }) => {
  const [likeImg, setLikeImg] = useState("heart_unfilled");
  const [totalLikes, setTotalLikes] = useState(0);
  useEffect(() => {
      setTotalLikes(likeCount);
      setLikeImg("heart_unfilled"); // todo 글 단건조회 좋아요 여부
  }, [studyId, totalLikes]);
// todo login modal
//   const modalVisible = useSelector((state) => state.loginStep.modalVisible); 로그인이 필요한지 store에서 가져옴
  // const [modalVisible, setModalVisible] = useState(false);

  // const dispatch = useDispatch();

  // const openModal = () => {
  //   document.body.style.overflow = "hidden"; // todo 모아서 처리 가능한지 확인..
  //   dispatch(setModalVisible(true));
  // };

  // const closeModal = () => {
  //   document.body.style.overflow = "auto";
  //   dispatch(setModalVisible(false));
  // };

  const handleLikesClick = async () => {
    if (likeImg === "heart_filled") {
      const response = await studyService.deleteLikes(studyId);
      setLikeImg("heart_unfilled");
      setTotalLikes(response.data.likeUsers.length);
    } else {
      const response = await studyService.addLikes(studyId);
      setTotalLikes(response.data.likeUsers.length);
      setLikeImg("heart_filled");
    }
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
          <p>{totalLikes}</p>
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
      {/* <Modal visible={modalVisible} name="login" onClose={closeModal}> */}
        {/* 로그인 화면 구현 */}
      {/* </Modal> */}
    </>
  );
};

export default LikesAndViews;
