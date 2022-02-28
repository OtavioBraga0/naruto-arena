import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getAllCharacterThunk } from "../../domain/thunks/characterThunk";

type UseCharacterType = {
  actions: {
    handleGetAllCharacters: () => void;
  };
};

export const useCharacter = (): UseCharacterType => {
  const dispatch = useDispatch();

  const handleGetAllCharacters = useCallback(() => {
    dispatch(getAllCharacterThunk());
  }, [dispatch]);

  return {
    actions: {
      handleGetAllCharacters,
    },
  };
};
