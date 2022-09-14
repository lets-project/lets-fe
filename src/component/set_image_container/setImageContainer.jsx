import React, { useState } from "react";
import SetImage from "../set_image/setImage";
import { useDispatch, useSelector } from "react-redux";
import { clearStep, nextStep } from "../../store/loginStep";
import { addUserNickname } from "../../store/user";
import { toast } from "react-toastify";

const SetImageContainer = (props) => {
  const dispatch = useDispatch();
  const loginStep = useSelector((state) => state.loginStep);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleSignUp = async () => {
    const nickname = loginStep.nickname;
    const socialLoginId = loginStep.socialLoginId;
    const tags = loginStep.tags;
    const authProvider = loginStep.authProvider;
    let profile = "";
    if (isImageChanged) {
      if (userImage) {
        const dataIndex = userImage.indexOf(",") + 1;
        const base64 = userImage.substring(dataIndex, userImage.length);
        profile = base64;
      }
    } else {
      profile = "PUBLIC";
    }

    dispatch(
      addUserNickname({
        socialLoginId,
        nickname,
        tags,
        profile,
        authProvider,
      })
    ).then((response) => {
      if (response.type == addUserNickname.fulfilled) {
        dispatch(nextStep());
      } else {
        toast("Sign up error please try later.", {
          position: "top-right",
          autoClose: 3000,
        });
        dispatch(clearStep());
      }
    });
  };

  return (
    <SetImage
      loginStep={loginStep}
      isImageChanged={isImageChanged}
      setIsImageChanged={setIsImageChanged}
      userImage={userImage}
      setUserImage={setUserImage}
      handleLoginStep={handleSignUp}
    ></SetImage>
  );
};

export default SetImageContainer;
