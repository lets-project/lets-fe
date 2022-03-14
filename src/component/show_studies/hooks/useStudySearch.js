import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import studyService from 'service/study_service';

const useStudySearch = (postStatus, page, sort) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [studyList, setStudyList] = useState([]);
  const selectedLanguages = useSelector((state) => state.language);
  const [currentLanguage, setCurrentLanguage] = useState([]);

  useEffect(() => {
    setStudyList((prev) => []);
    setCurrentLanguage((lang) => [...selectedLanguages]);
  }, [selectedLanguages, postStatus]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (currentLanguage.length !== selectedLanguages.length) {
      return;
    }

    studyService
      .getList(postStatus, page, sort, selectedLanguages)
      .then((response) => {
        setStudyList((prev) => [...prev, ...response.data]);
        setLoading(false);
        setHasMore(response.data.length > 0);
      })
      .catch((e) => {
        setError(true);
      });
  }, [
    postStatus,
    page,
    selectedLanguages,
    currentLanguage.length,
    sort,
  ]);

  return { loading, error, studyList, hasMore };
};

export default useStudySearch;
