import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import authService from "service/auth_service";
import userService from "service/user_service";
import httpClient from "service/http_client";

/* 

user 관련 store를 다루는 redux store 입니다.
createSlice를 통해 전역 user state를 생성하고,
createAsyncThunk를 통해 user 상태를 update 합니다.

to-do
fullfilled외에 rejected도 처리 로직 추가

*/

// action 정의
const fetchUserByIdAction = createAction("user/fetchByIdStatus");
const fetchUserByRefreshTokenAction = createAction(
  "user/fetchUserByRefreshToken"
);
const addUserNicknameAction = createAction("user/addUserNickname");
const modifyUserInfoAction = createAction("user/modifyUserInfo");

// 사용자 정보를 수정하고 access token을 설정합니다.
const modifyUserInfo = createAsyncThunk(
  modifyUserInfoAction,
  async (userData, { rejectWithValue }) => {
    const response = await userService.modifyUserInfo(userData.id, userData);

    // 정보 수정 성공시에만 access token 설정
    if (response.modifySuccess) {
      const accessToken = response.user.data.accessToken;
      // header에 access token 설정
      httpClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } else {
      return rejectWithValue(response.modifySuccess);
    }

    return response.user.data;
  }
);

// Userid로 Social Login 후, access token을 설정합니다.
const fetchUserById = createAsyncThunk(
  fetchUserByIdAction,
  async (userData, thunkAPI) => {
    console.log(userData);
    const response = await authService.login(userData.socialLoginId, userData.authProvider);
    const accessToken = response.accessToken;

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return response.data;
  }
);

/* page refresh시 cookie에 남아있는 http-only refresh token을 이용해
   유저 정보를 얻어 옵니다. */
const fetchUserByRefreshToken = createAsyncThunk(
  fetchUserByRefreshTokenAction,
  async (thunkAPI) => {
    const response = await authService.getUserInfo();

    const accessToken = response.data.accessToken;
    const userInfo = {
      nickname: response.data.nickname,
      id: response.data._id,
      image: response.data.image,
      likeLanguages: response.data.likeLanguages,
    };

    // header에 access token 설정
    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return userInfo;
  }
);

// 최초 회원 가입 시 user nickname을 설정하고 access token을 set합니다.
const addUserNickname = createAsyncThunk(
  addUserNicknameAction,
  async (userInfo, thunkAPI) => {
    const response = await authService.signUp(userInfo);
    const accessToken = response.data.accessToken;

    httpClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    return userInfo;
  }
);

const initialState = {
  nickname: undefined,
  id: undefined,
  imageUrl: undefined,
  likeLanguages: [],
};

const defaultPath = "기본 이미지";
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    clearUser: (state) => initialState,
  },
  extraReducers: {
    [fetchUserById.fulfilled]: (state, { payload }) => ({
      ...state,
      nickname: payload.nickname,
    }),

    [fetchUserByRefreshToken.fulfilled]: (state, { payload }) => ({
      ...state,
      nickname: payload.nickname,
    }),

    [addUserNickname.fulfilled]: (state, { payload }) => ({
      ...state,
      nickname: payload.nickname,
    }),

    [modifyUserInfo.fulfilled]: (state, { payload }) => ({
      ...state,
      nickname: payload.nickname,
    }),

    [modifyUserInfo.rejected]: (state, { payload }) => {
      if (payload === 401) {
        state.postError = "failed"; // post 정보 담음
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export {
  fetchUserById,
  fetchUserByRefreshToken,
  addUserNickname,
  modifyUserInfo,
};
export default userSlice.reducer;
