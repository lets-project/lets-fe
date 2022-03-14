/*eslint-disable*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles";
import * as S from "./styles";

function SocialLogin(props) {
  const [curModal, setCurModal] = useState(0);
  return (
    <S.StyledGreyBackground show={props.show}>
      <S.LoginWrapper>
        <S.LoginHeader>
          <S.Close onClick={props.handleClose}>로고</S.Close>
          <S.Close onClick={props.handleClose}>X</S.Close>
        </S.LoginHeader>
        <S.LoginBody>{curModalPageFunc(curModal)}</S.LoginBody>
      </S.LoginWrapper>
    </S.StyledGreyBackground>
  );
}

const curModalPageFunc = (curModal) => {
  switch (curModal) {
    case 0:
      return <ModalFirstLoginPage />;
    case 1:
      return <ModalSecondNamePage />;
  }
};

const ModalFirstLoginPage = (props) => {
  return (
    <>
      <S.WelcomeText>렛츠에 오신 것을 환영합니다!</S.WelcomeText>
      <S.BtnWrapper>
        <S.LoginColumn>
          <S.LoginBtn>

          <a href="https://lets-team-project.herokuapp.com/oauth2/authorization/google">
            <S.BtnImg
              src={`/images/login/googleBtn.png`}

             />
             
             </a>
            
            <S.LoginText>Google 로그인</S.LoginText>
          </S.LoginBtn>
          <S.LoginBtn>
            <S.BtnImg src={`/images/login/githubBtn.png`} />
            <S.LoginText
              onClick={() => {
                props.setCurModal(1);
              }}
            >
              Github 로그인
            </S.LoginText>
          </S.LoginBtn>
          <S.LoginBtn>
            <S.BtnImg
              src={`/images/login/kakaoBtn.png`}
              onClick={() => {
                console.log("second clicked!");
              }}
            />
            <S.LoginText>Kakao 로그인</S.LoginText>
          </S.LoginBtn>
        </S.LoginColumn>
      </S.BtnWrapper>
    </>
  );
};

const ModalSecondNamePage = () => {
  return (
    <>
      <h1 className="title">
        Hola에 처음 오셨군요!
        <br />
        우선, 사용하실 닉네임을 설정해 볼까요?
      </h1>
      <div className="inputWrapper">
        <h3 className="nicknameText">닉네임</h3>
        <input
          className="nicknameInput"
          type="text"
          name="nickNameInput"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <button onClick={handleLoginStep} className="buttonNext" name="complete">
        다음
      </button>
    </>
  );
};

export default SocialLogin;
