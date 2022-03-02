import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { characterSelector } from "../../../domain/ducks/characterReducer";
import { DEFAULT_CHARACTER } from "../../../domain/entities/Character";
import { CharacterDetail } from "../../components/CharacterDetail";
import CharacterIcon from "../../components/CharacterIcon";
import { useCharacter } from "../../hooks/useCharacter";

import "./style.scss";
import { ROUTES } from "../../Router";
import { teamSelector } from "../../../domain/ducks/teamReducer";

export const Home: React.FC = () => {
    const {
        page,
        actions: { handleNavigate, handleGetAllCharacters },
    } = useCharacter();

    const { paginatedCharacters } = useSelector(characterSelector);
    const { team } = useSelector(teamSelector);

    const hasPrev = useMemo(
        () => Boolean(paginatedCharacters.prev),
        [paginatedCharacters.prev]
    );

    const hasNext = useMemo(
        () => Boolean(paginatedCharacters.next),
        [paginatedCharacters.next]
    );

    const currentTeam = useMemo(() => {
        const blankTeam = Array(3).fill(DEFAULT_CHARACTER);

        return [...team, ...blankTeam].slice(0, 3);
    }, [team]);

    useEffect(() => {
        handleGetAllCharacters(page);
    }, [page, handleGetAllCharacters]);

    return (
        <main className="main">
            <CharacterDetail />
            <div className="main__menu">
                <a
                    className="main__menu__item"
                    href={ROUTES.MISSIONS}
                    target="_blank"
                    rel="noreferrer"
                >
                    Missions
                </a>
                <button className="main__menu__item">Start Ladder Game</button>
                <button className="main__menu__item">Start Quick Game</button>
                <button className="main__menu__item">Start Private Game</button>
            </div>
            <div className="main__footer">
                <div className="main__footer__characters">
                    <button
                        className="main__footer__prev-button"
                        disabled={!hasPrev}
                        onClick={() => handleNavigate(true)}
                    />
                    <div className="main__footer__characters__list">
                        {paginatedCharacters.characters &&
                            paginatedCharacters.characters.map((character) => (
                                <CharacterIcon
                                    character={character}
                                    key={character.id}
                                    disabled={team.indexOf(character) !== -1}
                                />
                            ))}
                    </div>
                    <button
                        className="main__footer__next-button"
                        disabled={!hasNext}
                        onClick={() => handleNavigate()}
                    />
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
