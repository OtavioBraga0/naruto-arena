import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { characterSelector } from "../../../domain/ducks/characterReducer";

import "./style.scss";

const INITIAL_DETAIL = {
  title: "",
  description: "",
  image: "",
};

export const CharacterDetail: React.FC = () => {
  const { detailedCharacter } = useSelector(characterSelector);

  const [detail, setDetail] = useState(INITIAL_DETAIL);

  const handleChangeDescription = useCallback(
    (name?: string) => {
      let newDetail = INITIAL_DETAIL;
      if (name) {
        const filteredSkill = detailedCharacter?.skills.filter(
          (skill) => skill.skillName === name
        )[0];
        newDetail = {
          title: filteredSkill?.skillName as string,
          description: filteredSkill?.skillDescription as string,
          image: filteredSkill?.skillPics as string,
        };
      } else {
        newDetail = {
          title: detailedCharacter?.name as string,
          description: detailedCharacter?.description as string,
          image: detailedCharacter?.avatar as string,
        };
      }

      setDetail(newDetail);
    },
    [detailedCharacter]
  );

  useEffect(() => {
    setDetail({
      title: detailedCharacter?.name as string,
      description: detailedCharacter?.description as string,
      image: detailedCharacter?.avatar as string,
    });
  }, [detailedCharacter]);

  return detailedCharacter ? (
    <div className="character-detail">
      <h2>{detailedCharacter.name}</h2>
      <div className="character-detail__images">
        <img
          className="character-detail__images__item character-detail__images__avatar"
          src={detailedCharacter.avatar}
          alt={detailedCharacter.name}
          onClick={() => handleChangeDescription()}
        />
        {detailedCharacter.skills.map((skill) => (
          <img
            className="character-detail__images__item"
            src={skill.skillPics}
            alt={skill.skillName}
            key={skill.skillName}
            onClick={() => handleChangeDescription(skill.skillName)}
          />
        ))}
      </div>
      <div className="character-detail__content">
        <div className="character-detail__content__detail">
          <h3>{detail.title}</h3>
          <span>{detail.description}</span>
        </div>
        <img src={detail.image} alt={detail.title} />
      </div>
    </div>
  ) : (
    <div></div>
  );
};
