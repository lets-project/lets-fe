import React from "react";
import styles from "./notFound.module.css";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleOnclick = () => {
        navigate("/");
    };

    return (
        <div className={styles.notFoundWrapper}>
            <img
                className={styles.errorImg}
                src="/images/info/404.png"
                alt="error"
            />
            <div className={styles.message}>요청하신 페이지를 찾을 수 없어요.</div>

            <button className={styles.homeButton} onClick={handleOnclick}>
                홈으로 가기
            </button>
        </div>
    );
};

export default NotFound;
