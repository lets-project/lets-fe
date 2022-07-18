import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentInput from "../comment_input/commentInput";
import CommentList from "../comment_list/commentList";
import studyService from "service/study_service";
import { toast } from "react-toastify";

const CommentContainer = ({ postId, comments }) => {
  const [content, setContent] = useState("");
  const [isComplete, setIsComplete] = useState(false); // 갱신시 useEffect 발생용 state
  const dispatch = useDispatch();

  const nickname = useSelector((state) => state.user.nickname);

  // 댓글 등록 버튼
  const onRegisterClick = async (e) => {
    if (nickname === undefined) {
      toast.error("로그인이 해주세요", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    await studyService.registerComment({ postId, content });
    window.location.reload();
  };
  return (
    <>
      {nickname != undefined ? (
        <CommentInput
          postId={postId}
          content={content}
          setContent={setContent}
          onRegisterClick={onRegisterClick}
          count={comments.length}
        ></CommentInput>
      ) : (
        ""
      )}
      <CommentList
        postId={postId}
        CommentList={comments}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
      ></CommentList>
    </>
  );
};

export default CommentContainer;
