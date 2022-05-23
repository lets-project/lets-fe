import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

import logo from 'logo.svg';
import '../settings/Settings.css';
import Navbar from 'component/nav_bar/navbar';
import LikeLanguages from 'component/like_languages/likeLanguages';

// 화면은 닉네임 -> 이미지 -> 언어선택 순서

const Join = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [imgSrc, setImgSrc] = useState(logo);
    const [likeLanguages, setLikeLanguages] = useState([]);

    // 아래 2개는 모달 기능 구현 시 제작 예정
    // const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);

    // 1-1. 이미지 등록 함수
    const onChangeImg = (evt) => {
        if (evt.target.files.length) {
            const imgTarget = evt.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgTarget);
            fileReader.onload = function (e) {
                setImgSrc(e.target.result);
            };
        } else {
            setImgSrc(logo);
        }
    };

    // 1-2. 이미지 초기화 함수
    const onResetImg = (e) => {
        e.preventDefault();
        setImgSrc(logo);
    };

    const onSetToast = (e, message) => {
        e.preventDefault();
        toast(message, {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    //4-1. 완료 버튼
    const onCompleteClick = () => {
        navigate('/');
    };

    return (
        <>
            <div className="settingMain">
                <Navbar/>
                <form>
                    <h1>회원가입</h1>
                    <h3 className="imageH3">이미지를 선택해주세요</h3>
                    <p className="description">미 업로드시 기본 이미지로 자동 설정됩니다.</p>
                    <div className="userImageUpload">
                        <img className="userImageUploadUserImg" src={imgSrc} alt="user avatar"/>
                        <div className="userImageUploadImageControl">
                            <label className="userImageUploadCustomLabel">
                                이미지 선택
                                <div>
                                    <input name="img" type="file" onChange={onChangeImg}></input>
                                </div>
                                <button type="submit" value="등록하기"></button>
                            </label>
                            <button className="userImageUploadButtonImageDelete" onClick={onResetImg}>
                                이미지 제거
                            </button>
                        </div>
                    </div>
                    <div className="settingTitleWrapper">
                        <h3>닉네임을 선택해주세요</h3>
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
                    <hr/>
                    <div className="settingTitleWrapper settingLikeLanguages">
                        <h3>관심 기술을 태그해주세요</h3>
                        <div className="likeLanguageWrapper">
                            <LikeLanguages
                                placeholder={'관심 태그 선택'}
                                likeLanguages={likeLanguages}
                                setLikeLanguages={setLikeLanguages}
                            ></LikeLanguages>
                        </div>
                    </div>
                    <p className="description">관심 태그를 기반으로 소식을 추천해드려요.</p>

                    <hr/>
                    {/* 닉네임님 안녕하세요, 회원가입이 완료되었습니다
                    라는 모달 띄우기 */}
                    <button
                        type="submit"
                        form="settingForm"
                        className="settingButtonComplete"
                        onClick={
                            onCompleteClick
                            // axios
                            //     .patch(
                            //         'https://lets-team-project.herokuapp.com/api/users/setting',
                            //         { name: '태희', id: 1, socialLoginId: '108552210897697745160' },
                            //         {
                            //             headers: {
                            //                 Authorization:
                            //                     'Bearer eyJyb2xlIjoiUk9MRV9VU0VSIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiIyIiwiaWF0IjoxNjQ0ODIyMDMyLCJleHAiOjE2NDQ4MjM4MzJ9.AzFz8DCiGNARmLVzikgQzGppaZtjFU4I8yagTFdFRbdhKmwaFv_Ue90JrJGRkluKD0ycFKbdPdzWrFJPFIq3cQ',
                            //             },
                            //         }
                            //     )
                            //     .then((res) => {
                            //         console.log(res);
                            //     })
                            //     .catch((err) => {
                            //         console.log(err);
                            //     });
                            // }
                        }
                        name="complete"
                    >
                        완료
                    </button>
                </form>
            </div>
        </>
    );
};

export default Join;
