import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import studyService from "../service/study_service";
import languageList from "../common/languageList";
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
// todo 데이터 받아오는 것 확인하고 Study content 의 예시코드 제거
//   const response = await studyService.getDetail(id);
  // return response.data;

  return {
    "id": 1,
    "likeCount": 1,
    "viewCount": 2,
    "tags": [
      "spring"
    ],
    "postStatus": "RECRUITING",
    "title": "title1",
    "content": "content1",
    "comments": [{
      "id": 1,
      "nickname": "y2",
      "content": "comment1",
      "createdTime": "2022-02-02T22:49:29.7294406"
    },
    {
      "id": 2,
      "nickname": "ttest",
      "content": "TEST COMMENT",
      "createdTime": "2022-03-09T17:49:29.7294406"
    }]
  };
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
        // nickname: payload.author.nickName,
        // imagePath: payload.author.image,
        comments: payload.comments,
        likeCount: payload.likeCount,
        updatedAt: payload.updatedAt,
        viewCount: payload.viewCount,
        postStatus: payload.postStatus,
      },
    }),
  },
});

export { readPost };
export const { clearPost } = readSlice.actions;
export default readSlice.reducer;