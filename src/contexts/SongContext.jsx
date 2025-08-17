import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

SongProvider.propTypes = {
  children: PropTypes.node,
};

const SongStateContext = createContext();
const SongActionsContext = createContext();
const SongAudioContext = createContext();
const PlayListContext = createContext();

const initialState = {
  curPlayList: { id: "", tracks: [], sortBy: "" },
  curSong: null,
  isPlayed: false,
  isShuffled: false,
  isRepeated: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "playlist/loaded":
      return {
        ...state,
        curPlayList: action.payload ? action.payload : state.curPlayList,
      };
    case "curSong/loaded":
      return {
        ...state,
        curSong: action.payload,
      };
    case "curSong/played":
      return {
        ...state,
        isPlayed: action.payload,
      };
    case "curSong/shuffled":
      return {
        ...state,
        isShuffled: !state.isShuffled,
        isRepeated: false,
      };
    case "curSong/repeated":
      return {
        ...state,
        isShuffled: false,
        isRepeated: !state.isRepeated,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function SongProvider({ children }) {
  const prevSongList = useRef([]);
  const audioRef = useRef(new Audio());

  const [
    { curPlayList, curSong, isPlayed, isShuffled, isRepeated, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const setPlayList = useCallback((playlist) => {
    dispatch({ type: "playlist/loaded", payload: playlist });
  }, []);

  function setCurSong(song) {
    dispatch({ type: "curSong/loaded", payload: song });
  }

  function playCurSong(boolean) {
    dispatch({ type: "curSong/played", payload: boolean });
  }

  function setIsShuffled() {
    dispatch({ type: "curSong/shuffled" });
  }

  function setIsRepeated() {
    dispatch({ type: "curSong/repeated" });
  }

  function setError(error) {
    dispatch({ type: "error", payload: error });
  }

  const nextCurSong = useCallback(() => {
    if (!curPlayList || curPlayList.tracks.length === 0) return;

    const currentIndex = curPlayList.tracks.findIndex(
      (song) => song.id === curSong?.id
    );

    let nextIndex;

    if (isShuffled) {
      if (currentIndex >= 0) {
        prevSongList.current = [...prevSongList.current, currentIndex];
      }

      if (prevSongList.current.length >= curPlayList.tracks.length) {
        prevSongList.current = currentIndex >= 0 ? [currentIndex] : [];
      }

      const availableIndices = curPlayList.tracks
        .map((_, index) => index)
        .filter((index) => !prevSongList.current.includes(index));

      nextIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      nextIndex = (currentIndex + 1) % curPlayList.tracks.length;
    }

    dispatch({
      type: "curSong/loaded",
      payload: curPlayList.tracks[nextIndex],
    });
  }, [curPlayList, curSong, isShuffled]);

  function prevCurSong() {
    if (!curPlayList || curPlayList.tracks.length === 0) return;

    const currentIndex = curPlayList.tracks.findIndex(
      (song) => song.id === curSong?.id
    );

    if (isShuffled) {
      if (prevSongList.current.length > 0) {
        const prevIndex = prevSongList.current.pop();
        dispatch({
          type: "curSong/loaded",
          payload: curPlayList.tracks[prevIndex],
        });
        return;
      }
      const prevIndex = Math.floor(Math.random() * curPlayList.tracks.length);
      dispatch({
        type: "curSong/loaded",
        payload: curPlayList.tracks[prevIndex],
      });
    } else {
      const prevIndex =
        (currentIndex - 1 + curPlayList.tracks.length) %
        curPlayList.tracks.length;
      dispatch({
        type: "curSong/loaded",
        payload: curPlayList.tracks[prevIndex],
      });
    }
  }

  // Reset prevSongList when playlist or shuffle changes
  useEffect(() => {
    prevSongList.current = [];
  }, [curPlayList, isShuffled]);

  // Handle song end
  useEffect(() => {
    const handleSongEnd = () => {
      if (isRepeated) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          dispatch({ type: "error", payload: err.message });
        });
      } else {
        nextCurSong();
      }
    };
    if (audioRef.current)
      audioRef.current.addEventListener("ended", handleSongEnd);
    return () => {
      if (audioRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.removeEventListener("ended", handleSongEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRepeated, nextCurSong]);

  // Update audio source when curSong changes
  useEffect(() => {
    if (curSong?.preview_url) {
      audioRef.current.src = curSong.preview_url;
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = ""; // Clear src to prevent playing invalid audio
    }
  }, [curSong]);

  // Handle play/pause based on isPlayed
  useEffect(() => {
    if (!curSong?.preview_url) return;

    if (isPlayed) {
      audioRef.current.play().catch((err) => {
        dispatch({ type: "error", payload: err.message });
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlayed, curSong]);

  const stateValue = useMemo(
    () => ({
      curSong,
      isPlayed,
      isShuffled,
      isRepeated,
      error,
    }),
    [curSong, isPlayed, isShuffled, isRepeated, error]
  );

  const actionsValue = {
    setCurSong,
    playCurSong,
    setIsShuffled,
    setIsRepeated,
    nextCurSong,
    prevCurSong,
    setError,
  };

  const playList = useMemo(
    () => ({ curPlayList, setPlayList }),
    [curPlayList, setPlayList]
  );

  return (
    <SongStateContext.Provider value={stateValue}>
      <SongActionsContext.Provider value={actionsValue}>
        <SongAudioContext.Provider value={audioRef}>
          <PlayListContext.Provider value={playList}>
            {children}
          </PlayListContext.Provider>
        </SongAudioContext.Provider>
      </SongActionsContext.Provider>
    </SongStateContext.Provider>
  );
}

export {
  SongProvider,
  SongStateContext,
  SongActionsContext,
  SongAudioContext,
  PlayListContext,
};
