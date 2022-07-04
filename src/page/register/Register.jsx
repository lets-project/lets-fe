import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import "./Register.css";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import Navbar from "component/nav_bar/navbar";
import LikeLanguages from "component/like_languages/likeLanguages";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [body, setBody] = useState("");
  const [likeLanguages, setLikeLanguages] = useState([]);

  const { title, content, language, post, postError, postId } = useSelector(
    ({ write }) => ({
      title: write.title,
      content: write.content,
      language: ["java, javascript"],
      post: write.post,
      postError: write.postError,
      postId: write.postId,
    })
  );

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    setLikeLanguages(language);
    document.querySelector(".ql-editor").innerHTML = content;
  }, [content]);

  const handleBody = (e) => {
    setBody(e);
  };

  const checkValidity = () => {
    if (!title) {
      toast.error("제목을 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (language.length === 0) {
      toast.error("사용 언어를 선택해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }

    if (!content) {
      toast.error("내용을 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
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
                setTitle(e.target.value);
              }}
              value={title}
            />
            <div className="languageWrapper">
              <h3>사용 언어: </h3>
              <div className="likeLanguagesWrapper">
                <LikeLanguages
                  placeholder={"프로젝트/스터디 진행 언어 선택"}
                  likeLanguages={likeLanguages}
                  setLikeLanguages={setLikeLanguages}
                ></LikeLanguages>
              </div>
            </div>
            <ReactQuill
              id="ql-editor"
              placeholder="프로젝트/스터디 진행 방식 및 신청 방법(오픈카톡, 댓글 등)에 대해 구체적으로 작성 부탁드려요!"
              modules={Register.modules}
              formats={Register.formats}
              onChange={handleBody}
              autoClose={true}
              value={content}
            ></ReactQuill>
          </section>
          <section>
            <ButtonComponent
              title={title}
              likeLanguages={likeLanguages}
              history={history}
            ></ButtonComponent>
          </section>
        </section>
      </div>
    </>
  );
};

Register.modules = {
  toolbar: [
    //[{ 'font': [] }],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

Register.formats = [
  //'font',
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
];

function ButtonComponent(props) {
  let navigate = useNavigate();

  return (
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
          const html = document.querySelector(".ql-editor").innerHTML;
          const data = {
            title: props.title,
            content: html,
            tags: props.likeLanguages.map((element) => element.value),
          };

          if (!checkValidity()) {
            return;
          }

          if (postId) {
            dispatch(modifyPost({ postId, title, content, language })).then(
              (response) => {
                toast.info("글 수정이 완료되었어요!", {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            );
          } else {
            dispatch(writePost({ title, content, language })).then(
              (response) => {
                toast.success("글 작성이 완료되었어요!", {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            );
          }
        }}
      >
        글 등록
      </button>
    </section>
  );
}

export default Register;
