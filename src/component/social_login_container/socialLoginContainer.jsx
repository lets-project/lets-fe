import React from "react";
import { useDispatch } from "react-redux";
import { nextStep, setSignUpUser } from "store/loginStep";
import SocialLogin from "component/social_login/socialLogin";
import { fetchUserById } from "store/user";

const SocialLoginContainer = ({ handleClose }) => {
  const googleClientId = process.env.REACT_APP_GOOGLE_API_KEY;
  const kakaoClientId = "350a422d4d8b1bb1be2dc82fe517afed";
  const dispatch = useDispatch();

  const googleOnSuccess = async (response) => {
    const userData = {
      socialLoginId: response.googleId,
      authProvider: "google",
    };
    dispatch(fetchUserById(userData)).then((response) => {
      if (response.type == fetchUserById.fulfilled) {
        handleClose();
      } else {
        dispatch(
          setSignUpUser({ key: "socialLoginId", value: userData.socialLoginId })
        );
        dispatch(
          setSignUpUser({ key: "authProvider", value: userData.authProvider })
        );
        dispatch(nextStep());
      }
    });
  };

  const googleOnFailure = (error) => {
    console.log(error);
  };

  const kakaoOnSuccess = async (data) => {
    const id = data.profile.id;
    const userData = { socialLoginId: id, authProvider: "kakao" };
    await dispatch(fetchUserById(userData)).then((response) => {
      if (response.type == fetchUserById.fulfilled) handleClose();
      else {
        dispatch(
          setSignUpUser({ key: "socialLoginId", value: userData.socialLoginId })
        );
        dispatch(
          setSignUpUser({ key: "authProvider", value: userData.authProvider })
        );
        dispatch(nextStep());
      }
    });
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <SocialLogin
      googleOnSuccess={googleOnSuccess}
      googleOnFailure={googleOnFailure}
      googleClientId={googleClientId}
      kakaoOnSuccess={kakaoOnSuccess}
      kakaoOnFailure={kakaoOnFailure}
      kakaoClientId={kakaoClientId}
    ></SocialLogin>
  );
};

export default SocialLoginContainer;
