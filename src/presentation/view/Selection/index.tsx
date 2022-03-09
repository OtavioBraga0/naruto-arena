import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { characterSelector } from "../../../domain/ducks/characterReducer";
import { DEFAULT_CHARACTER } from "../../../domain/entities/Character";
import { CharacterDetail } from "../../components/CharacterDetail";
import CharacterIcon from "../../components/CharacterIcon";
import { useCharacter } from "../../hooks/useCharacter";

import "./style.scss";
import { teamSelector } from "../../../domain/ducks/teamReducer";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";

export const Selection: React.FC = () => {
  const {
    actions: { handleGetPaginatedCharacters },
  } = useCharacter();

  const { paginatedCharacters } = useSelector(characterSelector);
  const { team } = useSelector(teamSelector);

  const currentTeam = useMemo(() => {
    const blankTeam = Array(3).fill(DEFAULT_CHARACTER);

    return [...team, ...blankTeam].slice(0, 3);
  }, [team]);

  useEffect(() => {
    handleGetPaginatedCharacters();
  }, [handleGetPaginatedCharacters]);

  return (
    <main className="main">
      <CharacterDetail />
      <div className="main__menu">
        <button className="main__menu__item">Start Ladder Game</button>
        <Link to={ROUTES.QUICK_MATCH} className="main__menu__item">
          Start Quick Match
        </Link>
        <button className="main__menu__item">Start Private Game</button>
      </div>
      <div className="main__footer">
        <div className="main__footer__characters">
          <button className="main__footer__prev-button" />
          <div className="main__footer__characters__list">
            {paginatedCharacters &&
              paginatedCharacters.map((character) => (
                <CharacterIcon
                  character={character}
                  key={character.id}
                  disabled={
                    team.indexOf({
                      ...character,
                      health: 100,
                      condition: [],
                    }) !== -1
                  }
                />
              ))}
          </div>
          <button className="main__footer__next-button" />
        </div>
        <div className="main__footer__team">
          {currentTeam.map((teamMember, index) => (
            <CharacterIcon
              character={teamMember}
              key={`${teamMember.id}-${index}`}
              isOnTeam
            />
          ))}
        </div>
      </div>
    </main>
  );
};
