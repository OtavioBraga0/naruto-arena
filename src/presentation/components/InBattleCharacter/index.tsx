import React, { HTMLAttributes, useCallback, useState } from "react";
import { ICharacter } from "../../../domain/entities/Character";

interface InBattleCharacterType extends HTMLAttributes<HTMLElement> {
  character: ICharacter;
  health: number;
  enemy?: boolean;
  handleSelectSkill?: (damage: number) => void;
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
  const [spelled, setSpelled] = useState(false);

  const handleSpellSkill = useCallback(
    (damage: number) => {
      if (handleSelectSkill) {
        handleSelectSkill(damage);
      }

      setSpelled(true);
    },
    [handleSelectSkill]
  );

  return (
    <div {...rest} className={`${className} in-battle-character`}>
      <div className="in-battle-character__avatar">
        <img
          src={character.avatar}
          alt={character.name}
          onClick={() =>
            enemy && handleSelectTarget && handleSelectTarget(character.id)
          }
        />
        {health}/100
      </div>
      {!enemy && (
        <div className="in-batlle__skills">
          {character.skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => handleSpellSkill(skill.ability.value)}
              disabled={spelled}
            >
              {skill.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
