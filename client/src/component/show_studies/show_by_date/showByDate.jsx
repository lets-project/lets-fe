import React from 'react';
import EmptyList from '../../empty_list/emptyList';
import StudyList from '../../study_list/studyList';

const ShowByDate = () => {
  const studyList = [{
    id : 1,
    language : ["React","NodeJS"],
    isClosed : true,
    views : 56,
    likes : ['test1', 'test2'],
    totalLikes : 2,
    title : "최신 사이드 프로젝트 같이하실 분",
    content : "React, NodeJS로 진행하려고 합니다.",
    author : { image: '3j5idn.PNG', nickName: 'TEST' },
    createdAt : '2021-12-18T13:31:08.457Z',
    updatedAt : '2021-12-18T13:31:08.457Z'
  }, {
    id : 2,
    language : ["Vue","Spring"],
    isClosed : false,
    views : 105,
    likes : [],
    totalLikes : 20,
    title : "최신 Toy Project 스터디원 모집합니다.",
    content : "Vue와 Spring으로 진행하려고 합니다.",
    author : { image: '3j5idn.PNG', nickName: '테스트' },
    createdAt : '2021-12-18T13:31:08.457Z',
    updatedAt : '2021-12-18T13:31:08.457Z'
  }];
  return (
    <>
      {studyList.length === 0 ? ( 
        <EmptyList />
       ) : ( 
        <StudyList
          studyList={studyList}
        ></StudyList>
      )} 
    </>
  );
};

export default ShowByDate;