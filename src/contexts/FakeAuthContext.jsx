import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { apiClient, getTokenFromCode } from "../pages/Auth/spotify";

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
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
    case "user/loaded":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
        isLoading: false,
      };
    case "logout":
      return initialState;
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
  const [hastoken, setHasToken] = useState(false);
  const hasHandledAuth = useRef(false);

  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  useEffect(() => {
    const code = urlParams.get("code");
    if (code && !hasHandledAuth.current) {
      hasHandledAuth.current = true;
      getTokenFromCode(code)
        .then((data) => {
          if (data && data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            // window.dispatchEvent(new Event("storage"));
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            setHasToken(true);
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
      if (!hastoken) {
        return;
      }
      dispatch({ type: "loading" });
      try {
        const data = await apiClient("me");
        // console.log("FakeAuthContext.jsx: User data fetched =", data);
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
  }, [hastoken]);

  function logout() {
    localStorage.removeItem("access_token");
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
