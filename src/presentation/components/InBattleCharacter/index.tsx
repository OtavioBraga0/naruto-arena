import React, { HTMLAttributes, useMemo } from "react";
import { useSelector } from "react-redux";
import { battleSelector } from "../../../domain/ducks/battleReducer";
import { IInBattleCharacter, Skill } from "../../../domain/entities/Character";
import { useBattle } from "../../hooks/useBattle";

import "./style.scss";

interface InBattleCharacterType extends HTMLAttributes<HTMLElement> {
  character: IInBattleCharacter;
  health: number;
  enemy?: boolean;
  handleSelectSkill?: (member: number, skill: Skill) => void;
  handleSelectTarget?: (id: number) => void;
}

export const InBattleCharacter: React.FC<InBattleCharacterType> = ({
  character,
  health,
  enemy = false,
  handleSelectSkill,
  handleSelectTarget,
  className,
  ...rest
}) => {
  const { turn } = useSelector(battleSelector);

  const {
    actions: { handleCancelSkill },
  } = useBattle();

  const checkCharacterAction = useMemo(() => {
    return turn.filter((action) => action.member === character.id)[0];
  }, [turn, character]);

  return (
    <div
      {...rest}
      className={`${className} in-battle-character ${
        character.condition.includes("dead") ? "in-battle-character--dead" : ""
      }`}
    >
      <div className="in-battle-character__avatar">
        <img
          src={character.avatar}
          alt={character.name}
          onClick={() =>
            enemy && handleSelectTarget && handleSelectTarget(character.id)
          }
        />
        {!enemy && checkCharacterAction && (
          <button
            key={checkCharacterAction.skill.name}
            onClick={() => handleCancelSkill(checkCharacterAction.member)}
          >
            {checkCharacterAction.skill.name}
          </button>
        )}
        {health}/100
      </div>
      {!enemy && (
        <div className="in-batlle__skills">
          {character.skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() =>
                handleSelectSkill && handleSelectSkill(character.id, skill)
              }
              disabled={
                turn.filter((turnSkill) => turnSkill.member === character.id)
                  .length > 0
              }
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
