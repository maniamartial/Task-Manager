import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import formatHttpApiError from "src/helpers/formatHttpError";

export default function useRequestAuth() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState();

  const handleRequestError = useCallback(
    (err) => {
      const formattedError = formatHttpApiError(err);
      setError(formattedError);
      enqueueSnackbar(formattedError);
      setLoading(false);
    },
    [enqueueSnackbar, setLoading, setError]
  );

  const register = useCallback(
    ({ username, email, password }, successCallback) => {
      setLoading(true);
      axios
        .post("/api/auth/users/", {
          username,
          email,
          password,
        })
        .then(() => {
          enqueueSnackbar("Signup successful, continue to the login page");
          setLoading(false);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestError);
    },
    [enqueueSnackbar, handleRequestError, setLoading]
  );

  const login = useCallback(
    ({ username, password }, successCallback) => {
      setLoading(true);
      axios
        .post("/api/auth/token/login", { username, password })
        .then((res) => {
          const { auth_token } = res.data;
          localStorage.setItem("authToken", auth_token);
          setLoading(false);
          if (successCallback) {
            successCallback();
          }
        })
        .catch(handleRequestError);
    },
    [handleRequestError, setLoading]
  );

  return {
    login,
    register,
    loading,
    error,
  };
}
