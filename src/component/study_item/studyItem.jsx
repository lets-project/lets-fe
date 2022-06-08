import React from "react";
import styles from "./studyItem.module.css";
import {useNavigate} from "react-router-dom";
import {FaRegCommentDots, FaRegEye} from "react-icons/fa";

const StudyItem = ({study}) => {
    const studyLang = [];
    const navigate = useNavigate();
    console.log(study);
    const displayType = study.status == "RECRUITING" ? styles.open : styles.closed;

    for (let i = 0; i < study.tags.length; i++) {
        if (study.tags[i] === undefined) break;
        if (study.tags[i] === "c#") studyLang.push("cc");
        else studyLang.push(study.tags[i]);
    }

    const onClick = () => {
        navigate(`/study/${study.id}`);
    };

    return (
        <>
            <li
                className={`${styles.studyItem} ${displayType}`}
                onClick={onClick}
            >
                <h1 className={styles.title}>{study.title}</h1>
                <ul className={styles.content}>
                    {studyLang.map((lang, i) => (
                        <li key={i} className={styles.language}>
                            <img
                                className={styles.languageImage}
                                src={`/images/languages/${lang.toLowerCase()}.png`}
                                alt="language"
                            />
                            <p className={styles.languageName}>
                                {lang === "cc" ? "c#" : lang}
                            </p>
                        </li>
                    ))}
                </ul>
                <section className={styles.info}>
                    <div className={styles.infoItem}>
                        <FaRegCommentDots size={14} color={"#9A9A9A"}/>
                        <p className={styles.comments}>{study.totalComments}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <FaRegEye size={16} color={"#9A9A9A"}/>
                        <p className={styles.views}>{study.viewCount}</p>
                    </div>

                    <div className={styles.infoItem}>
                        <img
                            className={styles.itemImg}
                            src="/images/info/heart_filled.png"
                            alt="likes"
                        />
                        <p>{study.likeCount}</p>
                    </div>
                </section>
                {study.status != "RECRUITING" && <div className={styles.closeNotice}>모집 완료</div>}
            </li>

        </>
    );
};

export default StudyItem;