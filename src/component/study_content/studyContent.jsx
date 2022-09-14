import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "common/utils";
import CommentContainer from "../comment_container/commentContainer";
import LikesAndViews from "../likes_and_views/likesAndViews";
import studyService from "service/study_service";
import { setPost } from "store/write";
import StudyButtons from "../study_buttons/studyButtons";
import styles from "./studyContent.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import RecommendPost from "../recomment_post/RecommendPost";

const StudyLanguage = ({ tags }) => {
  const usedLanguage = tags;
  return (
    <section className={styles.usedLanguageWrapper}>
      <div className={styles.usedLanguageInfo}>사용 언어 :</div>
      <ul className={styles.languageList}>
        {usedLanguage.map((lang, i) => (
          <LangItem Language={lang} key={i}></LangItem>
        ))}
      </ul>
    </section>
  );
};

const LangItem = ({ Language }) => {
  return <li className={styles.languageItem}>{Language}</li>;
};

const StudyContent = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const read = useSelector((state) => state.read);

  const handleDelete = async (id) => {
    await studyService
      .deleteStudy(id)
      .then(() => {
        toast.success("글 삭제가 완료되었어요!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("글 삭제가 실패하였습니다. 나중에 다시 시도해주세요", {
          position: "top-right",
          autoClose: 3000,
        });
      });

    document.body.style.overflow = "auto";
  };

  const handleEnd = async (editValue) => {
    await studyService.editPostStatus(id, editValue);
  };

  const handleEdit = (dispatch, navigate) => {
    dispatch(setPost(read.post));
    navigate("/register");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.postHeader}>
        <FaArrowLeft
          size="30"
          color="808080"
          cursor="pointer"
          onClick={handleBack}
        />

        <div className={styles.userAndDate}>
          <div className={styles.title}>{read.post.title}</div>
          {user.nickname === read.post.nickname && (
            <StudyButtons
              navigate={navigate}
              dispatch={dispatch}
              handleEdit={handleEdit}
              handleDelete={() => handleDelete(id)}
              handleEnd={handleEnd}
              postState={read.post.postStatus}
            />
          )}
        </div>

        <div className={styles.userAndDate}>
          <div className={styles.user}>
            <img
              className={styles.userImg}
              src={
                read.post.userImagePath == null
                  ? "/images/logo/lets.png"
                  : read.post.userImagePath
              }
              alt="userImg"
            />
            <div className={styles.userName}>{read.post.nickname}</div>
          </div>
          <div className={styles.registeredDate}>
            {formatDate(read.post.createdDate)}
          </div>
        </div>

        <RecommendPost id={read.post.id} tags={read.post.tags} />

        <StudyLanguage tags={read.post.tags}></StudyLanguage>
      </section>
      <div className={styles.postContentWrapper}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: read.post.content }}
        ></div>
      </div>

      <section className={styles.modalComment}>
        <LikesAndViews
          viewCount={read.post.viewCount}
          likeCount={read.post.likeCount}
          isLikedPost={read.post.islikedPost}
          postId={read.post.id}
        />
        <div className={styles.postComment}>
          <CommentContainer
            postId={read.post.id}
            comments={read.post.comments}
          />
        </div>
      </section>
    </div>
  );
};

export default StudyContent;
