import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOnTeam, removeFromTeam } from "../../domain/ducks/characterReducer";
import { teamSelector } from "../../domain/ducks/teamReducer";
import { ICharacter } from "../../domain/entities/Character";

type UseTeamType = {
  actions: {
    handleAddOnTeam: (newTeamMember: ICharacter) => void;
    handleRemoveFromTeam: (id: number) => void;
  };
};

export const useTeam = (): UseTeamType => {
  const { team } = useSelector(teamSelector);

  const dispatch = useDispatch();

  const handleAddOnTeam = useCallback(
    (newTeamMember: ICharacter) => {
      if (team.length < 3) {
        dispatch(addOnTeam(newTeamMember));
      }
    },
    [dispatch, team]
  );

  const handleRemoveFromTeam = useCallback(
    (id: number) => {
      if (team) {
        const newTeam = team.filter(
          (teamMember: ICharacter) => teamMember.id !== id
        );
        dispatch(removeFromTeam(newTeam));
      }
    },
    [dispatch, team]
  );

  return {
    actions: {
      handleAddOnTeam,
      handleRemoveFromTeam,
    },
  };
};
