import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import languageList from "common/languageList";
import userService from "service/user_service";
import studyService from "service/study_service";
import { clearUser } from "store/user";
import { clearStep } from "store/loginStep";
import { modifyUserInfo } from "store/user";
import Setting from "page/setting/setting";

const SettingContainer = (props) => {
  const user = useSelector((state) => state.user);
  const [nickname, setNickname] = useState(user.nickname);
  const preNickname = user.nickname;
  const [likeLanguages, setLikeLanguages] = useState(user.tags);
  const [image, setImage] = useState(user.profile);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(async () => {
    const userInfo = await userService.getUserInfo();
    if (userInfo == undefined) {
      toast.error("오류입니다 다시 시도해주세요.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
      return;
    }
    setLikeLanguages(userInfo.tags);
    console.log(user);
    console.log(userInfo);
    if (user.nickname === undefined) {
      toast.error("로그인이 필요한 페이지입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    }
  }, [navigate, user.nickname]);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };

  if (likeLanguages.length > 0 && !likeLanguages[0].hasOwnProperty("value")) {
    const userLanguage = likeLanguages.map((obj) => ({
      value: obj,
      label: languageList.find((element) => element.value === obj).label,
    }));
    setLikeLanguages(userLanguage);
  }

  // 변경 완료 버튼
  const onCompleteClick = async () => {
    if (!nickname) {
      toast.error("닉네임을 입력해 주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (nickname.length > 15) {
      toast.error("닉네임은 15자 아래로 입력해주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      let userData = {
        tags: likeLanguages.map((element) => element.value),
      };

      //닉네임 변경
      if (nickname !== preNickname) {
        const response = await userService.checkNickname(user.id, nickname);
        if (response.isExists) {
          toast.info("닉네임이 중복 되었어요!", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
      }
      userData.nickname = nickname;

      // 이미지 변경
      if (isImageChanged) {
        if (image) {
          const dataIndex = image.indexOf(",") + 1;
          const base64 = image.substring(dataIndex, image.length);
          userData.profile = base64;
        } else userData.profile = "PUBLIC";
      } else {
        userData.profile = "KEEP";
      }

      userService.modifyUserInfo(userData).then((response) => {
        toast.success("변경이 완료되었어요!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
      });
    }
  };

  // 회원 탈퇴
  const onSignOutClick = async (e) => {
    const deleteResult = userService.deleteUser(user.id);
    if (deleteResult) {
      toast.success("회원 탈퇴가 완료되었어요!", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("userName");
      dispatch(clearUser());
      dispatch(clearStep());
      document.body.style.overflow = "auto";
      navigate("/");
    } else {
      toast.error("회원 탈퇴에 실패하였어요! 잠시 후 다시 시도해주세요.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Setting
        nickname={nickname}
        setNickname={setNickname}
        likeLanguages={likeLanguages}
        setLikeLanguages={setLikeLanguages}
        image={image}
        setImage={setImage}
        isImageChanged={isImageChanged}
        setIsImageChanged={setIsImageChanged}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        openModal={openModal}
        closeModal={closeModal}
        onCompleteClick={onCompleteClick}
        onSignOutClick={onSignOutClick}
      ></Setting>
    </>
  );
};

export default SettingContainer;
