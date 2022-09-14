import { useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import "./Register.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "component/nav_bar/navbar";
import LikeLanguages from "component/like_languages/likeLanguages";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modifyPost, writePost } from "store/write";
import { isFulfilled } from "@reduxjs/toolkit";

function Register() {
  const [head, setHead] = useState("");
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [likeLanguages, setLikeLanguages] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, content, tags, post, postError, postId } = useSelector(
    ({ write }) => ({
      title: write.title,
      content: write.content,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      postId: write.postId,
    })
  );

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    setHead(title);
    setBody(content);
    setLikeLanguages(tags);
    document.querySelector(".ql-editor").innerHTML = content;
  }, [content]);

  const handleBody = (e) => {
    setBody(e);
  };

  const checkValidity = () => {
    if (!head) {
      toast.error("제목을 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (likeLanguages.length === 0) {
      toast.error("사용 언어를 선택해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (!body) {
      toast.error("내용을 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (isPosting) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Navbar />;
      <div className="Register">
        <section className="postRegister">
          <section>
            <input
              className="titleInput"
              type="text"
              placeholder="제목을 입력하세요"
              name="nicknameInput"
              onChange={(e) => {
                setHead(e.target.value);
              }}
              value={head}
            />
            <div className="languageWrapper">
              <h3>사용 언어: </h3>
              <div className="likeLanguagesWrapper">
                <LikeLanguages
                  placeholder="프로젝트/스터디 진행 언어 선택"
                  likeLanguages={likeLanguages}
                  setLikeLanguages={setLikeLanguages}
                />
              </div>
            </div>
            <ReactQuill
              id="ql-editor"
              placeholder="프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성 부탁드려요!"
              modules={Register.modules}
              formats={Register.formats}
              onChange={handleBody}
              autoClose
              value={body}
            />
          </section>
        </section>
        <section className="writeButton">
          <button
            className="cancelButton"
            onClick={() => {
              navigate("/#");
            }}
          >
            취소
          </button>
          <button
            className="registerButton"
            onClick={() => {
              if (!checkValidity()) {
                return;
              }

              setIsPosting(true);

              if (postId) {
                dispatch(
                  modifyPost({
                    postId,
                    title: head,
                    content: body,
                    tags: likeLanguages,
                  })
                ).then((response) => {
                  toast.info("글 수정이 완료되었어요!", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                  navigate(`/study/${postId}`);
                });
              } else {
                dispatch(
                  writePost({
                    title: head,
                    content: body,
                    tags: likeLanguages,
                  })
                ).then((response) => {
                  if (response.type == writePost.fulfilled)
                    toast.success("글 작성이 완료되었어요!", {
                      position: "top-right",
                      autoClose: 3000,
                    });
                  setTimeout(
                    function () {
                      const postId = response.payload.data.id;
                      navigate(`/study/${postId}`);
                    }.bind(this),
                    1000
                  );
                });
              }
            }}
          >
            글 등록
          </button>
        </section>
      </div>
    </>
  );
}

Register.modules = {
  toolbar: [
    // [{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

Register.formats = [
  // 'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
];

export default Register;
