import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getPaginatedCharacterThunk,
  getDetailedCharacterThunk,
} from "../../domain/thunks/characterThunk";

type UseCharacterType = {
  actions: {
    handleGetPaginatedCharacters: () => void;
    handleGetDetailedCharacter: (id: number) => void;
  };
};

export const useCharacter = (): UseCharacterType => {
  const dispatch = useDispatch();

  const handleGetPaginatedCharacters = useCallback(() => {
    dispatch(getPaginatedCharacterThunk());
  }, [dispatch]);

  const handleGetDetailedCharacter = useCallback(
    (id: number) => {
      dispatch(getDetailedCharacterThunk(id));
    },
    [dispatch]
  );

  return {
    actions: {
      handleGetPaginatedCharacters,
      handleGetDetailedCharacter,
    },
  };
};
