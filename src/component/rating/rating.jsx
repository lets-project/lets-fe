import React, { useCallback, useRef, useState } from "react";
import styles from "./rating.module.css";

const Rating = React.memo(() => {
  const [showRating, setShowRating] = useState(false);
  const inputRef = useRef();

  const handleClick = useCallback(() => {
    setShowRating((state) => !state);
  }, []);

  return (
    <>
      {showRating ? (
        <section className={styles.container}>
          <header className={styles.header}>
            <div className={styles.exitWrapper} onClick={handleClick}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                tabIndex="1"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </div>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>렛츠를 소개합니다!</div>
              <div className={styles.content}>
                렛츠 프로젝트의 개발 과정은 어땠을까요?
              </div>
            </div>
          </header>
          <a href="https://www.notion.so/checknote/94e4be65a50e4398878dc176060f556c">
            <div className={styles.ratingIconImg}>
              <img src={`/images/logo/lets.png`} alt="lets" />
            </div>
            <div className={styles.inputWrapper}>사이트 소개 페이지</div>
          </a>
        </section>
      ) : (
        <div className={styles.ratingIcon}>
          <img
            className={styles.ratingIconImg}
            src="/images/logo/lets.png"
            alt="default"
            onClick={handleClick}
          />
        </div>
      )}
    </>
  );
});

export default Rating;
