import React, {useState} from "react";
import SetImage from "../set_image/setImage";
import {useDispatch, useSelector} from "react-redux";
import {nextStep} from "../../store/loginStep";
import studyService from "../../service/study_service";
import {addUserNickname} from "../../store/user";
import {toast} from "react-toastify";

const SetImageContainer = (props) => {
    const dispatch = useDispatch();
    const loginStep = useSelector((state) => state.loginStep);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [userImage, setUserImage] = useState(null);

    const handleSignUp = async () => {
        const nickName = loginStep.nickName;
        const socialLoginId = loginStep.socialLoginId;
        const tags = loginStep.tags;
        const authProvider = loginStep.authProvider;
        let profile = "";
        if (isImageChanged) {
            if (userImage) {
                const {preSignedUrl, fileName} = await studyService.getPresignedUrl(
                    nickName
                );
                profile = fileName;

                await studyService.uploadImageToS3WithBase64(
                    preSignedUrl,
                    userImage,
                    fileName
                );
                // console.log("response from uploadUserimgtoS3", response);
            }
        } else {
            profile = "PUBLIC";
        }

        console.log(this);
        dispatch(
            addUserNickname({
                socialLoginId,
                nickName,
                tags,
                profile,
                authProvider
            })).then(response => {
            if (response.type == addUserNickname.fulfilled) {
                dispatch(nextStep());
            } else {
                toast("Sign up error please try later.", {
                    position: 'top-right',
                    autoClose: 3000,
                });
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
