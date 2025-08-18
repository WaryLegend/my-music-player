import PropTypes from "prop-types";
import { apiClient, getTokenFromCode } from "../services/spotify";
import { createContext, useEffect, useMemo, useReducer, useRef } from "react";
import { queryClient } from "../utils/queryClient";

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: !!localStorage.getItem("access_token"),
  error: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "user/login":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        ...state,
        user: action.payload,
        error: "",
        isLoading: false,
      };
    case "logout":
      return { ...initialState, isAuthenticated: false };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const hasHandledAuth = useRef(false);

  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  useEffect(() => {
    const code = urlParams.get("code");
    if (code && !hasHandledAuth.current) {
      dispatch({ type: "loading" });
      hasHandledAuth.current = true;
      getTokenFromCode(code)
        .then((data) => {
          if (data && data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            dispatch({ type: "user/login" });
          } else {
            console.error("Failed to get token from code");
          }
        })
        .catch((err) => {
          console.error("Error in getTokenFromCode:", err);
        });
    }
  }, [urlParams]);

  useEffect(() => {
    async function fetchUser() {
      if (!isAuthenticated) {
        return;
      }
      dispatch({ type: "loading" });
      try {
        const data = await apiClient("me");
        dispatch({ type: "user/loaded", payload: data });
      } catch (err) {
        localStorage.removeItem("access_token");
        dispatch({
          type: "error",
          payload: "There was an error fetching user data...",
        });
      }
    }
    fetchUser();
  }, [isAuthenticated]);

  function logout() {
    localStorage.removeItem("access_token");
    queryClient.removeQueries();
    dispatch({ type: "logout" });
  }

  function setError(error) {
    dispatch({ type: "error", payload: error });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, isLoading, logout, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
