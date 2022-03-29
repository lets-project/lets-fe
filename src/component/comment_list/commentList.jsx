import React from "react";
import CommentItem from "../comment_item/commentItem";
import styles from "./commentList.module.css";

const CommentList = ({ postId, CommentList, setIsComplete, isComplete }) => (
  <ul className={styles.CommentList}>
    {CommentList.map((comment) => (
      <CommentItem
        postId={postId}
        comment={comment}
        key={comment.id}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
      ></CommentItem>
    ))}
  </ul>
);

export default CommentList;
