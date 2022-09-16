import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import studyService from "../service/study_service";

/* 
읽고 있는 post 상태를 만드는 redux store 입니다.
post 진입시 해당 내용을 기억하고 있다가, 이탈시 초기화합니다.
*/

const initialState = {
  loading: "idle",
  post: {
    id: undefined,
    title: "",
    language: [],
    content: "",
    nickname: "",
    imagePath: "",
    createdAt: "",
    likes: [],
    totalLikes: 0,
    updatedAt: "",
    views: 0,
    isClosed: false,
  },
  error: null,
};

const readPostAction = createAction("read/readPost");

const readPost = createAsyncThunk(readPostAction, async (id, thunkAPI) => {
  const response = await studyService.getDetail(id);
  return response.data;
});

const readSlice = createSlice({
  name: "read",
  initialState,
  reducers: {
    clearPost: (state) => initialState,
  },
  extraReducers: {
    [readPost.fulfilled]: (state, { payload }) => ({
      ...state,
      loading: "success",
      post: {
        id: payload.id,
        title: payload.title,
        tags: payload.tags,
        content: payload.content,
        nickname: payload.nickname,
        createdDate: payload.createdDate,
        userImagePath: payload.profile,
        comments: payload.comments,
        likePostStatus: payload.likePostStatus,
        likeCount: payload.likeCount,
        updatedAt: payload.updatedAt,
        viewCount: payload.viewCount,
        status: payload.status,
      },
    }),
  },
});

export { readPost };
export const { clearPost } = readSlice.actions;
export default readSlice.reducer;
