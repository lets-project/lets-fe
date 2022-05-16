/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import { fetchUserById } from "store/user";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login"
import authService from 'service/auth_service';
import axios from 'axios';
import './styles';
import * as S from './styles';

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
  const dispatch = useDispatch();
    return (
        <>
            <S.WelcomeText>렛츠에 오신 것을 환영합니다!</S.WelcomeText>
            <S.BtnWrapper>
                <S.LoginColumn>
                    <S.LoginBtn>
                    <GoogleLogin
                    clientId='692968151737-f44mrhnfa91vsbroef2m19niurj476ta.apps.googleusercontent.com'
                    onSuccess={async(response) => {
                        console.log(response);
                        const userData = {socialLoginId: response.googleId, authProvider: 'google'};
                        dispatch(fetchUserById(userData)).then((response) => {
                            authService.login(userData);
                        })
                    }}
                    onFailure={async(response) => {
                        console.log(response);
                    }}
                    render={(props) => ( 
                        <S.BtnImg
                        src={`/images/login/googleBtn.png`}
                        onClick={props.onClick}/>
                        )}/>
                        <S.LoginText>Google 로그인</S.LoginText>
                    </S.LoginBtn>
                    <S.LoginBtn>
                        <S.BtnImg src={`/images/login/githubBtn.png`} />
                        <S.LoginText
                            onClick={() => {
                                axios
                                .get('https://lets-team-project.herokuapp.com/oauth2/authorization/github')
                                .then((res) => {
                                    if(res.loginSuccess){
                                        axios.post('https://lets-team-project.herokuapp.com/api/auth/signin', )
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            }}
                        >
                            Github 로그인
                        </S.LoginText>
                    </S.LoginBtn><S.LoginBtn>
                        <S.BtnImg src={`/images/login/googleBtn.png`} />
                        <S.LoginText
                            onClick={() => {
                                curModalPageFunc(1);
                            }}
                        >
                            Goolgle 로그인
                        </S.LoginText>
                    </S.LoginBtn>
                    <S.LoginBtn>
                        <S.BtnImg
                            src={`/images/login/kakaoBtn.png`}
                            onClick={() => {
                                axios
                                .get('https://lets-team-project.herokuapp.com/oauth2/authorization/kakao')
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
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
                    name="nicknameInput"
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
