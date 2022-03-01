import React, { HTMLAttributes } from "react";
import { ICharacter } from "../../../domain/entities/Character";
import { useCharacter } from "../../hooks/useCharacter";
import { useTeam } from "../../hooks/useTeam";

import "./style.scss";

interface CharacterIconType extends HTMLAttributes<HTMLButtonElement> {
  character: ICharacter;
  isOnTeam?: boolean;
  disabled?: boolean;
}

const CharacterIcon: React.FC<CharacterIconType> = ({
  character,
  isOnTeam = false,
  ...rest
}) => {
  const {
    actions: { handleGetDetailedCharacter },
  } = useCharacter();

  const {
    actions: { handleAddOnTeam, handleRemoveFromTeam },
  } = useTeam();

  return character.id !== 0 ? (
    <button
      className="character-icon"
      onClick={() => !isOnTeam && handleGetDetailedCharacter(character.id)}
      onDoubleClick={() =>
        !isOnTeam
          ? handleAddOnTeam(character)
          : handleRemoveFromTeam(character.id)
      }
      {...rest}
    >
      <img src={character.avatar} alt={character.name} />
    </button>
  ) : (
    <div className="character-icon__markdown" />
  );
};

export default CharacterIcon;
