import React, { useEffect, useState } from "react";
import Select from "react-select";
import languageList from "common/languageList";

const LikeLanguages = ({ likeLanguages, setLikeLanguages, placeholder }) => {
  const customStyles = {
    control: (css) => ({
      ...css,
      maxWidth: "500px",
      width: "100%",
      minHeight: "3rem",
    }),
  };

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    const newLikeLanguages = languageList.filter((v) =>
      likeLanguages.includes(v.value)
    );
    setSelectedLanguages(newLikeLanguages);
  }, [likeLanguages]);

  return (
    <Select
      isMulti
      styles={customStyles}
      placeholder={placeholder}
      name="likeLanguages"
      options={languageList}
      classNamePrefix="select"
      value={selectedLanguages}
      onChange={(value) => {
        setSelectedLanguages(value);
        setLikeLanguages(value.map((v) => v.value));
      }}
    />
  );
};

export default LikeLanguages;
