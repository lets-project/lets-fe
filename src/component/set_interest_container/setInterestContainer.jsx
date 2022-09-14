import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setSignUpUser } from "store/loginStep";
import SetInterest from "component/set_interest/setInterest";

const SetInterestContainer = (props) => {
  const [likeLanguages, setLikeLanguages] = useState([]);
  const dispatch = useDispatch();
  const loginStep = useSelector((state) => state.loginStep);
  const handleLoginStep = () => {
    dispatch(
      setSignUpUser({
        key: "tags",
        value: likeLanguages,
      })
    );
    dispatch(nextStep());
  };

  return (
    <SetInterest
      loginStep={loginStep}
      handleLoginStep={handleLoginStep}
      likeLanguages={likeLanguages}
      setLikeLanguages={setLikeLanguages}
    ></SetInterest>
  );
};

export default SetInterestContainer;
