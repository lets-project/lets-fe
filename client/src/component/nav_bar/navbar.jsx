import React from "react";
import styles from "./navbar.module.css";
import logo from "../../logo.svg"
const Navbar = React.memo(() => {
  const openModal = () => {
    document.body.style.overflow = "hidden";
    alert("로그인 창 구현 예정");
  };
  const handleRegister = () => {
    alert("구현 예정");
  };
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img
          className={styles.logo}
          src={logo}
          alt="logo"
        />
      </a>
      <div className={styles.loginElementWrapper}>
        <button className={styles.postRegister} onClick={handleRegister}>
          새 글 쓰기
        </button>
          <button className={styles.login} onClick={openModal}>
            로그인
          </button>
      </div>
      {/* 로그인 모달 */}
    </nav>
  );
});

export default Navbar;