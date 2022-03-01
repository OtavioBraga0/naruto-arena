import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOnTeam,
  characterSelector,
  removeFromTeam,
} from "../../domain/ducks/characterReducer";
import { ICharacter } from "../../domain/entities/Character";
import {
  getAllCharacterThunk,
  getDetailedCharacterThunk,
} from "../../domain/thunks/characterThunk";

type UseCharacterType = {
  page: number;
  actions: {
    handleGetAllCharacters: (currentPage: number) => void;
    handleNavigate: (isPrev?: boolean) => void;
    handleGetDetailedCharacter: (id: number) => void;
    handleAddOnTeam: (detailedCharacter: ICharacter) => void;
    handleRemoveFromTeam: (id: number) => void;
  };
};

export const useCharacter = (): UseCharacterType => {
  const dispatch = useDispatch();

  const { team } = useSelector(characterSelector);

  const [page, setPage] = useState(1);

  const handleGetAllCharacters = useCallback(
    (currentPage) => {
      dispatch(getAllCharacterThunk({ page: currentPage }));
    },
    [dispatch]
  );

  const handleNavigate = useCallback((isPrev?: boolean) => {
    setPage((prev) => (isPrev ? prev - 1 : prev + 1));
  }, []);

  const handleGetDetailedCharacter = useCallback(
    (id: number) => {
      dispatch(getDetailedCharacterThunk(id));
    },
    [dispatch]
  );

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
    page,
    actions: {
      handleGetAllCharacters,
      handleNavigate,
      handleGetDetailedCharacter,
      handleAddOnTeam,
      handleRemoveFromTeam,
    },
  };
};
