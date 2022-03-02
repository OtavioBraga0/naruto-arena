import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPaginatedCharacterThunk,
  getDetailedCharacterThunk,
} from "../../domain/thunks/characterThunk";

type UseCharacterType = {
  page: number;
  actions: {
    handleGetAllCharacters: (currentPage: number) => void;
    handleNavigate: (isPrev?: boolean) => void;
    handleGetDetailedCharacter: (id: number) => void;
  };
};

export const useCharacter = (): UseCharacterType => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const handleGetAllCharacters = useCallback(
    (currentPage) => {
      dispatch(getPaginatedCharacterThunk({ page: currentPage }));
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

  const characterFilter = useMemo(() => {}, []);

  return {
    page,
    actions: {
      handleGetAllCharacters,
      handleNavigate,
      handleGetDetailedCharacter,
    },
  };
};
