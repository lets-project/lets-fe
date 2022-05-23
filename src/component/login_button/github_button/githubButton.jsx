import React from "react";
import styles from "./githubButton.module.css";

const GithubButton = (props) => {
    const clientId = "55b1b653fc23d0848a9d";
    return (
        <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={() => {
            }}>
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://localhost:3000/auth/github`}
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
