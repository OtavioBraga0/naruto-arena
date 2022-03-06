import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeamOnBattle,
  cancelSkill,
  endTurn,
  selectTarget,
} from "../../domain/ducks/battleReducer";
import { teamSelector } from "../../domain/ducks/teamReducer";
import { Skill } from "../../domain/entities/Character";

type UseBattleType = {
  actions: {
    handleStartBattle: () => void;
    handleSelectSkill: (member: number, skill: Skill) => void;
    handleSelectTarget: (id: number) => void;
    handleEndTurn: () => void;
    handleCancelSkill: (member: number) => void;
  };
};

export const useBattle = (): UseBattleType => {
  const { team } = useSelector(teamSelector);
  const dispatch = useDispatch();

  const [skill, setSkill] = useState<{ member: number; skill: Skill }>();

  const handleStartBattle = useCallback(() => {
    if (team) {
      dispatch(
        addTeamOnBattle({
          ally: team.map((teamMember) => ({ ...teamMember, health: 100 })),
          enemy: team.map((teamMember) => ({ ...teamMember, health: 100 })),
        })
      );
    }
  }, [dispatch, team]);

  const handleSelectSkill = useCallback((member, skill) => {
    setSkill({ member, skill });
  }, []);

  const handleSelectTarget = useCallback(
    (id: number) => {
      if (skill) {
        dispatch(selectTarget({ ...skill, target: id }));
      }
    },
    [dispatch, skill]
  );

  const handleEndTurn = useCallback(() => {
    dispatch(endTurn());
  }, [dispatch]);

  const handleCancelSkill = useCallback(
    (member) => {
      dispatch(cancelSkill(member));
    },
    [dispatch]
  );

  return {
    actions: {
      handleStartBattle,
      handleSelectSkill,
      handleSelectTarget,
      handleEndTurn,
      handleCancelSkill,
    },
  };
};
