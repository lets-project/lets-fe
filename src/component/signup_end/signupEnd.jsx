import React from "react";
import styles from "./signupEnd.module.css";
import loginStep, { clearStep } from "../../store/loginStep";
import { useDispatch } from "react-redux";

const SignupEnd = ({ handleClose }) => {
  const dispatch = useDispatch();

  const signupEnd = () => {
    dispatch(clearStep());
    console.log(loginStep);
    handleClose();
  };

  return (
    <>
      <h1 className={styles.title}>
        축하드려요! 가입되었습니다.
        <br />
        Let's에서 당신의 꿈을 코딩하세요!
      </h1>
      <img className={styles.logo} src="/images/logo/lets.png" alt="logo" />
      <button
        onClick={signupEnd}
        className={styles.buttonClose}
        name="complete"
      >
        시작하기
      </button>
    </>
  );
};

export default SignupEnd;
