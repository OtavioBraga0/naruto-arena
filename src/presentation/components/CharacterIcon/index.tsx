import React from "react";
import { ICharacter } from "../../../domain/entities/Character";
import { useCharacter } from "../../hooks/useCharacter";

import "./style.scss";

const CharacterIcon: React.FC<{
  character: ICharacter;
  isOnTeam?: boolean;
}> = ({ character, isOnTeam = false }) => {
  const {
    actions: {
      handleGetDetailedCharacter,
      handleAddOnTeam,
      handleRemoveFromTeam,
    },
  } = useCharacter();

  return (
    <button
      className="character-icon"
      onClick={() => !isOnTeam && handleGetDetailedCharacter(character.id)}
      onDoubleClick={() =>
        !isOnTeam
          ? handleAddOnTeam(character)
          : handleRemoveFromTeam(character.id)
      }
    >
      <img src={character.avatar} alt={character.name} />
    </button>
  );
};

export default CharacterIcon;
