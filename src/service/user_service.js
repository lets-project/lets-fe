import httpClient from "./http_client";

/* 
user 관련 API를 정의한 class입니다.
*/

class User {
  constructor(httpClient) {
    this.user = httpClient;
  }

  // id를 이용해 사용자 정보를 조회합니다.
  getUserInfo = async () => {
    try {
      const user = await this.user.get(`users/setting`);
      return user.data;
    } catch (error) {
      console.error(error);
    }
  };

  // user nickname 중복 검사를 실행합니다.
  checkNickname = async (id, nickname) => {
    try {
      const response = await this.user.get(`auth/exists?nickname=${nickname}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임을 이용해 사용자 정보를 조회합니다.
  getUserInfoByNickname = async (nickname) => {
    try {
      const params = {
        nickname: nickname,
      };

      const user = await this.user.get(`users`, {
        params,
      });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  // 사용자 정보를 수정합니다.
  // 닉네임이 변경될 경우 AccessToken을 다시 설정해야 합니다.
  modifyUserInfo = async (data) => {
    try {
      const response = await this.user.patch(`users/setting`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // 회원 탈퇴
  deleteUser = async () => {
    try {
      await this.user.post(`auth/signout`);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  getUserLikeList = async () => {
    try {
      const response = await this.user.get(`users/myLikes/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  getUserPostList = async () => {
    try {
      const response = await this.user.get(`users/myPosts/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
}

const userService = new User(httpClient);
export default userService;
