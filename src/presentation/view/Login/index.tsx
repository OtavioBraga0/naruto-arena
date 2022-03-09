import React, { useCallback, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const Login: React.FC = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    actions: { handleSignIn, handleSignUp },
  } = useAuth();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isLogIn) {
        handleSignIn(email, password);
      } else {
        handleSignUp(email, password);
      }
    },
    [handleSignIn, handleSignUp, isLogIn, email, password]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isLogIn ? "SignIn" : "SignUp"}</h3>
      <label>
        E-mail
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event?.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event?.target.value)}
        />
      </label>
      <button type="button" onClick={() => setIsLogIn((prev) => !prev)}>
        {!isLogIn ? "SignIn" : "SignUp"}
      </button>
      <button type="submit">{isLogIn ? "Login" : "Create"}</button>
    </form>
  );
};
