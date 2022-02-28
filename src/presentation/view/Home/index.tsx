import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { characterSelector } from "../../../domain/ducks/characterReducer";
import { useCharacter } from "../../hooks/useCharacter";

import "./style.scss";

export const Home: React.FC = () => {
  const {
    actions: { handleGetAllCharacters },
  } = useCharacter();

  const { allCharacters } = useSelector(characterSelector);

  console.log(allCharacters);

  useEffect(() => {
    handleGetAllCharacters();
  }, [handleGetAllCharacters]);

  return (
    <main className="main">
      {allCharacters &&
        allCharacters.map((character) => (
          <img src={character.avatar} alt={character.name} />
        ))}
    </main>
  );
};
