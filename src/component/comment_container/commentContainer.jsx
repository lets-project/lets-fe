import React, {useState} from "react";
import {useDispatch} from "react-redux";
import CommentInput from "../comment_input/commentInput";
import CommentList from "../comment_list/commentList";
import studyService from "service/study_service";

const CommentContainer = ({postId, comments}) => {
    const [content, setContent] = useState("");
    const [isComplete, setIsComplete] = useState(false); // 갱신시 useEffect 발생용 state 
    const dispatch = useDispatch();

    // const userId = useSelector((state) => state.user.id);
    const userId = "testId";

    // 댓글 등록 버튼
    const onRegisterClick = async (e) => {
        if (userId === undefined) {
            // 로그인 해주세요 모달 필요
            return;
        }
        await studyService.registerComment({postId, content});
        window.location.reload();
    };
    return (
        <>
            <CommentInput
                postId={postId}
                content={content}
                setContent={setContent}
                onRegisterClick={onRegisterClick}
                count={comments.length}
            ></CommentInput>
            <CommentList
                postId={postId}
                CommentList={comments}
                setIsComplete={setIsComplete}
                isComplete={isComplete}
            ></CommentList>
        </>
    );
};

export default CommentContainer;
