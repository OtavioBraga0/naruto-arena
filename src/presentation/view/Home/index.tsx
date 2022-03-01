import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  addOnTeam,
  characterSelector,
} from "../../../domain/ducks/characterReducer";
import { CharacterDetail } from "../../components/CharacterDetail";
import CharacterIcon from "../../components/CharacterIcon";
import { useCharacter } from "../../hooks/useCharacter";

import "./style.scss";

export const Home: React.FC = () => {
  const {
    page,
    actions: { handleNavigate, handleGetAllCharacters },
  } = useCharacter();

  const { allCharacters, team } = useSelector(characterSelector);

  const hasPrev = useMemo(
    () => Boolean(allCharacters.prev),
    [allCharacters.prev]
  );

  const hasNext = useMemo(
    () => Boolean(allCharacters.next),
    [allCharacters.next]
  );

  useEffect(() => {
    handleGetAllCharacters(page);
  }, [page, handleGetAllCharacters]);

  return (
    <main className="main">
      <CharacterDetail />
      <div className="main__footer">
        <div className="main__footer__characters">
          <button
            className="main__footer__prev-button"
            disabled={!hasPrev}
            onClick={() => handleNavigate(true)}
          />
          <div className="main__footer__characters__list">
            {allCharacters.characters &&
              allCharacters.characters.map((character) => (
                <CharacterIcon character={character} key={character.id} />
              ))}
          </div>
          <button
            className="main__footer__next-button"
            disabled={!hasNext}
            onClick={() => handleNavigate()}
          />
        </div>
        <div className="main__footer__team">
          {team.map((teamMember) => (
            <CharacterIcon
              character={teamMember}
              key={teamMember.id}
              isOnTeam
            />
          ))}
        </div>
      </div>
    </main>
  );
};
