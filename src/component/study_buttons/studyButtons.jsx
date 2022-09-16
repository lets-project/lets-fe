import React, { useState } from "react";
import styles from "./studyButtons.module.css";
import Modal from "../modal/modal_component/modal";
import CancelButton from "../cancel_button/cancelButton";
import studyService from "service/study_service";

const StudyButtons = ({
  navigate,
  dispatch,
  handleEdit,
  handleDelete,
  postId,
  status,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleteButton, setIsDeleTeButton] = useState(false);
  const [postStatus, setPostStatus] = useState(status);

  const openModal = (target) => {
    if (target === "deleteModal") setIsDeleTeButton(true);
    else setIsDeleTeButton(false);
    document.body.style.overflow = "hidden";
    setShowPopup((state) => !state);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowPopup((state) => !state);
  };

  const handleEnd = async () => {
    const response = await studyService.changePostStatus(postId);
    setPostStatus(response.data.status);
  };

  const handleStudy = () => {
    handleEnd(!status);
    closeModal();
  };

  return (
    <>
      <section className={styles.buttonWrapper}>
        <button onClick={() => openModal("endModal")}>
          {postStatus === "RECRUITING" ? "마감" : "마감 취소"}
        </button>
        <button onClick={() => handleEdit(dispatch, navigate)}>수정</button>
        <button onClick={() => openModal("deleteModal")}>삭제</button>
      </section>

      <Modal visible={showPopup} onClose={closeModal}>
        {isDeleteButton ? (
          <CancelButton
            confirmMsg="작성하신 글을 삭제 하시겠어요?"
            positiveMsg="네, 삭제할래요"
            negativeMsg="아니요"
            onCancel={closeModal}
            onPublish={handleDelete}
          ></CancelButton>
        ) : (
          <CancelButton
            confirmMsg={
              postStatus === "RECRUITING"
                ? "마감 처리 하시겠어요?"
                : "마감을 취소하시겠어요?"
            }
            positiveMsg={
              postStatus === "RECRUITING" ? "네, 마감할게요" : "네, 취소할게요"
            }
            negativeMsg="아니요"
            onCancel={closeModal}
            onPublish={handleStudy}
          ></CancelButton>
        )}
      </Modal>
    </>
  );
};

export default StudyButtons;
