import React, { useEffect } from "react";
import styles from "./navbar.module.css";
import Modal from "../modal/modal_component/modal";
import SocialLogin from "component/social_login/socialLogin";
import LoginUser from "component/login_user/loginUser";
import LoginModal from "../login_modal/loginModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {setModalVisible} from "../../store/loginStep";

const Navbar = React.memo((props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalVisible = useSelector((state) => state.loginStep.modalVisible);

  // const user = useSelector((state) => state.user); // 저장된 유저정보 가져옴
  const user = {
    id: "TEST",
    nickname: "Test Nickname",
  };
  // todo login modal
  // const modalVisible = useSelector((state) => state.loginStep.modalVisible); // Login Modal이 필요한지 가져옴.
  // const [modalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   document.body.style.overflow = "hidden";
  //   dispatch(setModalVisible(true));
  // };
  // const closeModal = () => {
  //   document.body.style.overflow = "auto";
  //   dispatch(setModalVisible(false));
  // }
  const openModal = () => {
    document.body.style.overflow = "hidden";
    dispatch(setModalVisible(true));
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    dispatch(setModalVisible(false));
  };
  const handleRegister = () => {
    if (user.id === undefined) {
      openModal();
      return;
    }
    navigate("/register");
  };

  useEffect(() => {
    if (user.id) {
      // User refresh token을 이용해서 유저정보 얻어옴
      // navigate("/");
      // dispatch(clearUser()); // 유저 초기화
      // toast.error("로그인이 만료 되었어요!", {
      // position: "top-right",
      // autoClose: 3000,
      // });
      // }
      // 실패했을때 에러처리 필요
      // });
    }
  }, [dispatch, navigate, user.id]);

  return (
    <>
      <nav className={styles.navbar}>
        <a href="/">
          <img className={styles.logo} src='/images/logo/lets.png' alt="logo" />
        </a>
        <div className={styles.loginElementWrapper}>
          <button className={styles.postRegister} onClick={handleRegister}>
            새 글 쓰기
          </button>
          {!user.nickname ? (
          <button className={styles.login} onClick={openModal}>
            로그인
          </button>
        ) : (
          <LoginUser />
        )}
        </div>

        <Modal visible={modalVisible} name="login" onClose={closeModal}>
          <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
        </Modal>
      </nav>
    </>
  );
});

export default Navbar;
