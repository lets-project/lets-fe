import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setSignUpUser } from "store/loginStep";
import SetNickname from "component/set_nickname/setNickname";
import { toast } from "react-toastify";
import userService from "service/user_service";

const SetNicknameContainer = (props) => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const userId = useSelector((state) => state.loginStep.id);
  const handleLoginStep = async () => {
    if (nickname.length > 15) {
      toast.info("닉네임은 최대 15글자 입니다.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (nickname.length === 0) {
      toast.info("닉네임을 입력해 주세요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const response = await userService.checkNickname(userId, nickname);
    if (!response) {
      toast.info("닉네임이 중복 되었어요!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    dispatch(setSignUpUser({ key: "nickname", value: nickname }));
    dispatch(nextStep());
  };

  return (
    <SetNickname
      setNickname={setNickname}
      handleLoginStep={handleLoginStep}
      nickname={nickname}
    ></SetNickname>
  );
};

export default SetNicknameContainer;
