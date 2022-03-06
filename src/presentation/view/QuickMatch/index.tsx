import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamOnBattle,
  battleSelector,
  endTurn,
  selectTarget,
} from "../../../domain/ducks/battleReducer";
import { teamSelector } from "../../../domain/ducks/teamReducer";
import { InBattleCharacter } from "../../components/InBattleCharacter";

import "./style.scss";

export const QuickMatch: React.FC = () => {
  const { battle } = useSelector(battleSelector);
  const { team } = useSelector(teamSelector);

  const dispatch = useDispatch();

  const [damage, setDamage] = useState(0);

  useEffect(() => {
    if (team) {
      dispatch(
        addTeamOnBattle({
          ally: team.map((teamMember) => ({ ...teamMember, health: 100 })),
          enemy: team.map((teamMember) => ({ ...teamMember, health: 100 })),
        })
      );
    }
  }, [dispatch, team]);

  const handleSelectSkill = useCallback((damage: number) => {
    setDamage(damage);
  }, []);

  const handleSelectTarget = useCallback(
    (id: number) => {
      dispatch(selectTarget({ damage, target: id }));
    },
    [dispatch, damage]
  );

  const handleEndTurn = useCallback(() => {
    dispatch(endTurn());
  }, [dispatch]);

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
