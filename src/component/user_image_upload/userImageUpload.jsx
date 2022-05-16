import React from "react";
import styles from "./userImageUpload.module.css";
import { isBase64 } from "common/utils";

const UserImageUpload = ({ image, setImage, setIsImageChanged }) => {
  const baseUrl = "/images/logo/lets.png";

  // 이미지 업로드 버튼
  const onImageUploadClick = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      if(file.size > 300000) {
        alert("파일 사이즈가 너무 큽니다.")
        return false
      }
      // FileReader를 사용해 BASE64로 변환합니다.
      const reader = new FileReader()
      // FileReader가 파일을 load했을 시 동작할 이벤트를 지정합니다.
      reader.addEventListener("load", () => {
        const dataIndex = reader.result.indexOf(',') + 1
        const base64 = reader.result.substring(
            dataIndex,
            reader.result.length
        )
        setImage(base64);
      })
      // file을 DataURL 형식으로 읽습니다.
      reader.readAsDataURL(file)
    }
    setIsImageChanged(true);
  };

  // 이미지 삭제 버튼
  const onImageRemoveClick = async (e) => {
    setImage("");
    setIsImageChanged(true);
  };

  // image가 base64면 그냥 쓰고, base64가 아니면 url로 조합
  // isImageChanged를 같이 넘겨받아서 그거에 따라 분기하는게 나을듯
  // 지금 든 생각: isBase64()에 '', undefined, null 다 false로 나오니까,
  // 이거 하나로만 분기해도 될 듯?
  return (
    <div className={styles.image}>
      <img
        className={styles.userImg}
        src={
          image
            ? isBase64(image)
              ? image
              : `${image}`
            : `${baseUrl}`
        }
        alt="user avatar"
      />
      <div className={styles.imageControl}>
        <label className={styles.customLabelFileUpload}>
          이미지 선택
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={onImageUploadClick}
          />
        </label>
        <button
          onClick={onImageRemoveClick}
          className={styles.buttonImageDelete}
        >
          이미지 제거
        </button>
      </div>
    </div>
  );
};

export default UserImageUpload;
