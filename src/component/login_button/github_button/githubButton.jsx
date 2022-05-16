import React from "react";
import styles from "./githubButton.module.css";

const GithubButton = (props) => {
  const clientId = process.env.REACT_APP_GITHUB_LOGIN_API_KEY;
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button} onClick={() => {}}>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://holaworld.io/auth/github`}
        >
          <img
              src={`/images/login/githubBtn.png`}
          />
        </a>
      </button>
      <p className={styles.loginDescription}>Github 로그인</p>
    </div>
  );
};

export default GithubButton;
