import React from "react";
import { useDispatch } from "react-redux";
import { nextStep, setSignUpUser } from "store/loginStep";
import SocialLogin from "component/social_login/socialLogin";
import { fetchUserById } from "store/user";

const SocialLoginContainer = ({ handleClose }) => {
  const googleClientId = '692968151737-f44mrhnfa91vsbroef2m19niurj476ta.apps.googleusercontent.com';
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
  const dispatch = useDispatch();

  const googleOnSuccess = async (response) => {
    const userData = {socialLoginId: response.googleId, authProvider: 'google'};
    dispatch(fetchUserById(userData)).then((response) => {
      console.log("fetchByuserID response :", response);
      if (response.type == fetchUserById.fulfilled) {
        handleClose();
      } 
      else {
        dispatch(setSignUpUser({ key: "socialLoginId", value: userData.socialLoginId }));
        dispatch(setSignUpUser({ key: "authProvider", value: userData.authProvider }));
        dispatch(nextStep());
      }
    });
  };

  const googleOnFailure = (error) => {
    console.log(error);
  };

  const kakaoOnSuccess = async (data) => {
    const accessToken = data.response.access_token;
    const userData = { code: accessToken, social: "kakao" };

    await dispatch(fetchUserById(userData)).then((response) => {
        console.log("fetchByuserID response :", response);
      const id = response.payload._id;
      if (response.payload.loginSuccess === true) handleClose();
      else {
        dispatch(setSignUpUser({ key: "id", value: id }));
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
