import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { battleSelector } from "../../../domain/ducks/battleReducer";
import { InBattleCharacter } from "../../components/InBattleCharacter";
import { useBattle } from "../../hooks/useBattle";

import "./style.scss";

export const QuickMatch: React.FC = () => {
  const { battle } = useSelector(battleSelector);

  const {
    actions: {
      handleStartBattle,
      handleSelectSkill,
      handleSelectTarget,
      handleEndTurn,
    },
  } = useBattle();

  useEffect(() => {
    handleStartBattle();
  }, [handleStartBattle]);

  return (
    <div className="in-battle">
      {battle["ally"] && battle["enemy"] && (
        <>
          <div className="in-battle__my-team">
            {battle["ally"].map((teamMember) => (
              <InBattleCharacter
                health={teamMember.health}
                key={teamMember.name}
                character={teamMember}
                handleSelectSkill={handleSelectSkill}
              />
            ))}
          </div>
          <div className="in-battle__enemy-team">
            {battle["enemy"].map((teamMember) => (
              <InBattleCharacter
                enemy
                health={teamMember.health}
                key={teamMember.id}
                character={teamMember}
                handleSelectTarget={handleSelectTarget}
              />
            ))}
          </div>
        </>
      )}

      <button
        style={{
          position: "absolute",
          top: "500px",
          width: "200px",
          height: "200px",
        }}
        onClick={() => handleEndTurn()}
      >
        End Turn
      </button>
    </div>
  );
};
