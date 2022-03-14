import httpClient from './http_client';
import { getFormatedToday } from '../common/utils';

/*
글 등록, 삭제, 수정, 조회 등 study 글 관련 api를 모아놓은 class입니다.
to-do
*/
class Study {
  constructor() {
    this.study = httpClient;
  }

  getList = async (postStatus, page, sort, tags) => {
    try {
      const params = {
        status: postStatus,
        page: page,
        sort: sort,
        tags: tags,
      };

      if (tags.length !== 0) {
        // 선택된 language가 있으면 language 속성 추가
        const qs = tags.map((language) => language).join(',');
        params.language = qs;
      }

      // const reponse = await this.study.get('posts', {
      //   params,
      // });
      const response = {};
      const studyList = [{
        id : 1,
        tags : ["React","NodeJS"],
        postStatus : "RECRUTING",
        viewCount : 56,
        likes : ['test1', 'test2'],
        likeCount : 2,
        title : "최신 사이드 프로젝트 같이하실 분",
        content : "React, NodeJS로 진행하려고 합니다.",
        author : { image: '3j5idn.PNG', nickName: 'TEST' },
        createdAt : '2021-12-18T13:31:08.457Z',
        updatedAt : '2021-12-18T13:31:08.457Z'
      }, {
        id : 2,
        tags : ["Vue","Spring"],
        postStatus : false,
        viewCount : 105,
        likes : [],
        likeCount : 20,
        title : "최신 Toy Project 스터디원 모집합니다.",
        content : "Vue와 Spring으로 진행하려고 합니다.",
        author : { image: '3j5idn.PNG', nickName: '테스트' },
        createdAt : '2021-12-18T13:31:08.457Z',
        updatedAt : '2021-12-18T13:31:08.457Z'
      }];
      response.data = studyList;
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getDetail = async (id) => {
    try {
      const response = await this.study.get(`posts/${id}`);
      return response;
    } catch (error) { 
      console.error(error);
    }
  };

  getRecommendedPost = async (id, tags) => {
    try {
      const response = await this.study.get(`posts/${id}/recommends`, {
        tags
      });
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
  register = async ({ title, content, language }) => {
    try {
      const response = await this.study.post('posts', {
        title,
        content,
        language,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  modify = async (id, title, content, language) => {
    try {
      const response = await this.study.put(`posts/${id}`, {
        title,
        content,
        language,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  editPostStatus = async (id, postStatus) => {
    try {
      const response = await this.study.patch(`posts/${id}`, {
        postStatus,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteStudy = async (id) => {
    try {
      await this.study.delete(`posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // 스터디의 댓글 리스트 조회
  getComments = async (id) => {
    try {
      // const response = await this.study.get(`posts/comments/${id}`);
      let response = {
        data: {
          comments: [{
            content: "TEST Comment",
            _id: "TESTID",
            author : {
              image: 'test imag',
              nickName: "test Nick",
              createdAt: Date.now()
            },
            createdAt: Date.now()
          }]
        }
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 신규 댓글 등록
  registerComment = async ({ id, content }) => {
    try {
      const response = await this.study.post('posts/comments', {
        studyId: id,
        content,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // 댓글 수정
  modifyComment = async ({ id, content }) => {
    try {
      const response = await this.study.patch(`posts/comments/${id}`, {
        content,
      });
      return response;
    } catch (error) {
      //console.log(error.response.status);
      return error.response.status;
      //console.log("error from console.log", error);
      //return
    }
  };

  // 댓글 삭제
  deleteComment = async ({ id }) => {
    try {
      await this.study.delete(`posts/comments/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  addLikes = async (studyId) => {
    try {
      // const response = await this.study.post('posts/likes', {
      //   studyId,
      // });
      const response = {
        data : {
          likeUsers: ['test1', 'test2', 'teste3']
        }
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  deleteLikes = async (studyId) => {
    try {
      // const response = await this.study.delete(`posts/likes/${studyId}`);
      const response = {
        data : {
          likeUsers: ['test1', 'test2']
        }
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  getPresignedUrl = async (userName) => {
    try {
      const fileName = `${userName}_${getFormatedToday()}.png`;
      const response = await this.study.post('users/sign', {
        fileName,
      });
      return { preSignedUrl: response.data.preSignUrl, fileName };
    } catch (error) {
      console.error(error);
    }
  };
}

const studyService = new Study(httpClient);
export default studyService;
