import React, { useState } from 'react';
import styles from './main.module.css';


import Navbar from '../../component/nav_bar/navbar';
import Banner from '../../component/banner/banner';
import Rating from '../../component/rating/rating';
import LanguageBarList from '../../component/language_bar_list/languageBarList';
import { AiFillFire } from 'react-icons/ai';
import { FaCalendarCheck } from 'react-icons/fa';

const Main = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <div className={styles.languageBarWrapper}>
                <LanguageBarList />
            </div>
            <div className={styles.appWrapper}>
                <div className={styles.app}>
                    <main className={styles.main}>
                        <div className={styles.categoryWrapper}>
                            <section className={styles.category}>
                                <div
                                    // className={`${styles.category__item} ${category === SHOW_BY_DATE ? ACTIVE : INACTIVE
                                    //     }`}
                                    // onClick={() => toggleCategory(SHOW_BY_DATE)}
                                >
                                    <FaCalendarCheck />
                                    <span className={styles.text}>최신</span>
                                </div>

                                <div
                                    // className={`${styles.category__item} ${category === SHOW_BY_DATE ? INACTIVE : ACTIVE
                                    //     }`}
                                    // onClick={() => toggleCategory(SHOW_BY_VIEWS)}
                                >
                                    <AiFillFire />
                                    <span className={styles.text}>인기</span>
                                </div>
                            </section>
                            <div className={styles.selectWrapper} 
                            // onClick={handleSelect}
                            >
                                <input
                                    className={styles.selectboxInput}
                                    type='checkbox'
                                    name='languageSelect'
                                    value='마감 글 보기'
                                    // checked={checked ? 'checked' : ''}
                                    readOnly
                                ></input>
                                <label htmlFor='languageSelect'>
                                    <span className={styles.selectTitle}>
                                        모집 중인 글만 보기
                                    </span>
                                </label>
                            </div>
                        </div>
                        {/* {category === SHOW_BY_DATE ? (
                            <ShowByDate checked={checked} />
                        ) : (
                            <ShowByViews checked={checked} />
                        )} */}
                    </main>
                </div>
                <Rating />
            </div>
        </>

    );
};

export default Main;