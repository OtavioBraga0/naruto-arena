import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../domain/ducks/authReducer";
import { IUser } from "../../domain/entities/User";
import { signInThunk, signUpThunk } from "../../domain/thunks/authThunk";

type UseAuthType = {
  user?: IUser;
  actions: {
    handleSignIn: (email: string, password: string) => void;
    handleSignUp: (email: string, password: string) => void;
  };
};

export const useAuth = (): UseAuthType => {
  const { user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const handleSignIn = useCallback(
    (email, password) => {
      dispatch(signInThunk({ email, password }));
    },
    [dispatch]
  );
  const handleSignUp = useCallback(
    (email, password) => {
      dispatch(signUpThunk({ email, password }));
    },
    [dispatch]
  );

  return {
    user,
    actions: {
      handleSignIn,
      handleSignUp,
    },
  };
};
