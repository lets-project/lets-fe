import React, {useCallback, useRef, useState} from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import useStudySearch from '../hooks/useStudySearch';

const ShowByDate = ({postStatus}) => {
    const sort = 'viewCount,DESC';
    const [pageNumber, setPageNumber] = useState(0);

    const observer = useRef();

    const {studyList, hasMore, loading} = useStudySearch(
        postStatus,
        pageNumber,
        sort,
    );

    const lastStudyElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 20);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <>
            {studyList.length === 0 ? ( //로딩 일 경우도 추가 !loading && studyList.length === 0 ?
                <EmptyList/>
            ) : (
                <StudyList
                    lastStudyElementRef={lastStudyElementRef}
                    studyList={studyList}
                ></StudyList>
            )}
        </>
    );
};

export default ShowByDate;