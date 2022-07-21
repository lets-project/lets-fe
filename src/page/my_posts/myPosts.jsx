import React, { useEffect, useState } from "react";
import Navbar from "component/nav_bar/navbar";
import styles from "./myPosts.module.css";
import { FaBook } from "react-icons/fa";
import StudyList from "component/study_list/studyList";
import userService from "service/user_service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EmptyList from "component/empty_list/emptyList";
import LoadingSpinner from "component/loading/loadingSpinner";

const MyPosts = (props) => {
  const [postList, setPostList] = useState([]);
  const nickname = useSelector((state) => state.user.nickname);
  const navigate = useNavigate();

  useEffect(() => {
    if (nickname === undefined) {
      toast.error("로그인이 필요한 페이지입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    }

    userService.getUserPostList(nickname).then((res) => {
      setPostList(res);
    });
  }, [nickname, navigate]);

  return (
    <>
      <Navbar />
      <section className={styles.pageWrapper}>
        <div className={styles.myLikes}>
          <main className={styles.main}>
            <section className={styles.category}>
              <div className={styles.category__item}>
                <FaBook />
                <span className={styles.text}>작성 목록</span>
              </div>
            </section>
            {postList.length === 0 ? (
              <span className={styles.text}>앗! 글이 아직 없네요.</span>
            ) : (
              <StudyList studyList={postList} />
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default MyPosts;
