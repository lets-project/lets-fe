import httpClient from "./http_client";
import axios from "axios";

/* 
auth 관련 API를 정의한 class입니다.
*/

class Auth {
    constructor() {
        this.auth = httpClient;
    }

    login = async (socialLoginId, authProvider) => {
        try {
            const signinResponse = await this.auth.post(`auth/signin`, {
                socialLoginId: socialLoginId,
                authProvider: authProvider
            });
            return signinResponse;
        } catch (error) {
            console.error(error);
        }
    };

    logout = async () => {
        try {
            await this.auth.post("auth/logout");

        } catch (error) {
            console.error(error);
        }
    };

    /* page refresh시 cookie에 남아있는 http-only refresh token을 이용해
     유저 정보를 얻어 옵니다. */
    getUserInfo = async () => {
        try {
            const userInfo = await this.auth.post("auth/silent-refresh");
            return userInfo;
        } catch (error) {
            console.error(error);
        }
    };

    /* userInfo를 전달하여 회원가입을 진행합니다. */
    signUp = async (userInfo) => {
        //todo base64 encoding
        return await this.auth.post("auth/signup", userInfo);
    };

    resetToken = () => {
        this.auth.defaults.headers.common["Authorization"] = "";
    };

    checkNickname = (nickname) => {
        try {
            const res = this.auth.get("auth/exists", {nickname});
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

const authService = new Auth(httpClient);
export default authService;
