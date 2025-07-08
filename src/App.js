import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function getRandomGradient() {
  const colors = [
    "#9a1d86",
    "#1595be",
    "#ff7f50",
    "#6a5acd",
    "#00b894",
    "#e17055",
    "#fd79a8",
  ];
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2 = colors[Math.floor(Math.random() * colors.length)];
  // Ensure two different colors
  while (color1 === color2) {
    color2 = colors[Math.floor(Math.random() * colors.length)];
  }
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

export default function App() {
  const [openList, setOpenList] = useState(false);
  const [musicList, setMusicList] = useState([]);

  const [curSong, setCurSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (curSong) {
      document.body.style.background = getRandomGradient();
    }
  }, [curSong]);

  return (
    <div className="app">
      <DashBoard>
        <Menu
          setOpenList={setOpenList}
          curSong={curSong}
          musicList={musicList}
        />
        <MusicInfo curSong={curSong} isPlaying={isPlaying} />
        <AudioController isPlaying={isPlaying}>
          <SliderController
            audioRef={audioRef}
            musicList={musicList}
            curSong={curSong}
            setCurSong={setCurSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
          />
          <ButtonController
            audioRef={audioRef}
            musicList={musicList}
            curSong={curSong}
            setCurSong={setCurSong}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isShuffle={isShuffle}
            setIsShuffle={setIsShuffle}
            isRepeat={isRepeat}
            setIsRepeat={setIsRepeat}
          />
        </AudioController>
        <audio ref={audioRef} />
      </DashBoard>
      <MusicListContainer openList={openList}>
        <ListHeader
          musicList={musicList}
          setMusicList={setMusicList}
          setCurSong={setCurSong}
        />
        <MusicList
          musicList={musicList}
          curSong={curSong}
          setCurSong={setCurSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </MusicListContainer>
    </div>
  );
}

function DashBoard({ children }) {
  return <div className="dash-board">{children}</div>;
}

function AudioController({ children, isPlaying }) {
  return (
    <>
      {children}
      {isPlaying && <SoundWave />}
    </>
  );
}

function SliderController({
  audioRef,
  musicList,
  curSong,
  setCurSong,
  isPlaying,
  setIsPlaying,
  isRepeat,
  isShuffle,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  // Format time helper
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Seek time change
  const handleSeekTo = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Volume change
  const handleVolume = (e) => {
    const vol = e.target.value / 100;
    audioRef.current.volume = vol;
    setVolume(Number(e.target.value));
  };

  // ⛳ Handle when song ends
  const handleSongEnd = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isRepeat) {
      audio.currentTime = 0;
      audio.play().catch((err) => console.error("Replay failed:", err));
    } else if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicList.length);
      setCurSong(musicList[randomIndex]);
    } else {
      const currentIndex = musicList.findIndex(
        (song) => song.id === curSong.id
      );
      if (currentIndex < musicList.length - 1) {
        setCurSong(musicList[currentIndex + 1]);
      } else {
        setIsPlaying(false);
        audio.currentTime = 0;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSong, isRepeat, isShuffle, musicList, setCurSong, setIsPlaying]);

  // Setup event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSongEnd]);

  // ▶️ Control play/pause + load song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !curSong) return;

    if (audio.src !== curSong.path) {
      audio.src = curSong.path;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [curSong, isPlaying, audioRef]);

  return (
    <>
      <Slider sliderName="music-dura slider">
        <div className="current_time">{formatTime(currentTime)}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          className="seek_slider"
          onChange={handleSeekTo}
          disabled={!curSong}
        />
        <div className="song_duration">{formatTime(duration)}</div>
      </Slider>
      <Slider sliderName="volume slider">
        <i className="fa fa-volume-down"></i>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="volume_slider"
          onChange={handleVolume}
          title="volume"
        />
        <i className="fa fa-volume-up"></i>
      </Slider>
    </>
  );
}

function ButtonController({
  audioRef,
  musicList,
  curSong,
  setCurSong,
  isPlaying,
  setIsPlaying,
  isShuffle,
  setIsShuffle,
  isRepeat,
  setIsRepeat,
}) {
  function togglePlayPause() {
    if (!curSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error);
      });
      setIsPlaying(true);
    }
  }
  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle((isShuffle) => !isShuffle);
    setIsRepeat(false); // Turn off repeat if shuffle is turned on
  };
  // Toggle repeat
  const toggleRepeat = () => {
    setIsRepeat((isRepeat) => !isRepeat);
    setIsShuffle(false); // Turn off shuffle if repeat is turned on
  };
  // Previous track
  const prevSong = () => {
    const currentIndex = musicList.findIndex((song) => song.id === curSong.id);
    if (currentIndex > 0) {
      setCurSong(musicList[currentIndex - 1]);
      setIsPlaying(true);
    }
  };
  // Next track
  const nextSong = () => {
    const currentIndex = musicList.findIndex((song) => song.id === curSong.id);
    if (currentIndex < musicList.length - 1) {
      setCurSong(musicList[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  return (
    /* button list */
    <div className="buttons">
      <Button
        btnName={`shuffle_song ${isShuffle ? "active" : ""}`}
        icon="fa fa-random"
        type="button"
        onClick={toggleShuffle}
        title={`Shuffle: ${isShuffle ? "On" : "Off"}`}
        disabled={!curSong}
      />
      <Button
        btnName="prev_song"
        icon="fa fa-step-backward"
        type="button"
        onClick={prevSong}
        title="Previous"
        disabled={!curSong}
      />
      <Button
        btnName={`play_pause ${isPlaying ? "active" : ""}`}
        icon={isPlaying ? "fa fa-pause-circle fa-beat" : "fa fa-play-circle"}
        type="button"
        onClick={togglePlayPause}
        title={isPlaying ? "Pause" : "Play"}
        disabled={!curSong}
      />
      <Button
        btnName="next_song"
        icon="fa fa-step-forward"
        type="button"
        onClick={nextSong}
        title="Next"
        disabled={!curSong}
      />
      <Button
        btnName={`repeat_song ${isRepeat ? "active" : ""}`}
        icon="fa fa-repeat"
        type="button"
        onClick={toggleRepeat}
        title={`Repeat: ${isRepeat ? "On" : "Off"}`}
        disabled={!curSong}
      />
    </div>
  );
}

// SoundWave Component
function SoundWave() {
  return (
    <div className="sound-wave run">
      {Array(9)
        .fill()
        .map((_, i) => (
          <span key={i} className="cane"></span>
        ))}
    </div>
  );
}

//Button components
function Button({
  btnName = "",
  type,
  icon = "",
  title = "",
  onClick,
  disabled = "",
  children = "",
}) {
  return (
    <button
      className={`${btnName} ${icon}`}
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
// Slider components
function Slider({ sliderName, children }) {
  return <div className={sliderName}>{children}</div>;
}

function Menu({ setOpenList, curSong, musicList }) {
  function handleOpenList() {
    setOpenList((prev) => !prev);
    // console.log(openList);
  }
  return (
    <div className="menu">
      <Button
        icon="fa fa-bars"
        type="button"
        title="Music list"
        onClick={handleOpenList}
      />
      <TotalSong curSong={curSong} musicList={musicList} />
      <Button
        icon="fa-regular fa-heart"
        type="button"
        onClick={() => {}}
        title="Like"
      />
    </div>
  );
}

function TotalSong({ curSong, musicList }) {
  return (
    <div className="Start">
      PLAYING {musicList?.findIndex((song) => song.id === curSong.id) + 1} of{" "}
      {musicList?.length}
    </div>
  );
}

function MusicInfo({ curSong, isPlaying }) {
  return (
    <div className="music-info">
      <div className="DISC">
        {curSong && <div className="disc_shadow"></div>}
        <div
          className={`disc_spin ${curSong ? "rotate" : ""} ${
            !isPlaying ? "paused" : ""
          }`}
          style={{
            backgroundImage: `${
              curSong
                ? `url(/image/${curSong?.image}.jpg`
                : "url(/image/screen.jpg)"
            }`,
          }}
        ></div>
      </div>
      <div className="song_name">{curSong?.name || "Song name"}</div>
      <div className="artist"> {`By ${curSong?.author || "author"}`}</div>
    </div>
  );
}

// 2rd part Music-List
function MusicListContainer({ children, openList }) {
  return (
    <div className={`music-list ${openList ? "show" : ""}`}>{children}</div>
  );
}

function ListHeader({ musicList, setMusicList, setCurSong }) {
  const fileInputRef = useRef(null);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newSongs = files
      .filter(
        (file) => !musicList?.some((song) => song.file.name === file.name)
      )
      .map((file) => {
        const fileName = file.name.replace(/\.[^/.]+$/, ""); // remove .mp3
        const parts = fileName.split("!");
        const [author, name, image] = parts; // destructure from split result

        return {
          id: crypto.randomUUID(),
          name: name || "Unknown Title",
          author: author || "Unknown Artist",
          image: image || "default-image",
          path: URL.createObjectURL(file),
          file,
        };
      });
    // Append new songs to the existing list && update curSong to first of the list if it's first time
    setMusicList((prevList) => {
      const updatedList = [...prevList, ...newSongs];
      if (prevList.length === 0 && newSongs.length > 0) {
        setCurSong(updatedList[0]);
      }
      return updatedList;
    });
  };

  return (
    <div className="header">
      <div className="title">
        <i className="fa fa-music"></i>
        <span>Music list</span>
      </div>
      <div>
        <Button
          btnName="custom-file-upload"
          type="button"
          icon="fa fa-plus"
          onClick={triggerFileInput}
        >
          {" Add song"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          id="songFiles"
          accept="audio/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}

function MusicList({
  musicList,
  curSong,
  setCurSong,
  isPlaying,
  setIsPlaying,
}) {
  return (
    <ul>
      {musicList?.map((music, index) => (
        <Music
          num={index}
          music={music}
          curSongId={curSong.id}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurSong={setCurSong}
          key={music.id}
        />
      ))}
    </ul>
  );
}

function Music({ num, music, curSongId, isPlaying, setIsPlaying, setCurSong }) {
  function handlePlayPause(music) {
    if (music.id === curSongId) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurSong(music);
      setIsPlaying(true);
    }
  }
  return (
    <li>
      <div className={`info ${curSongId === music.id && "active"}`}>
        <span className="No">{num + 1}</span>
        <Button
          icon={
            curSongId === music.id && isPlaying ? "fa fa-pause" : "fa fa-play"
          }
          type="button"
          title={curSongId === music.id && isPlaying ? "Pause" : "Play"}
          onClick={() => handlePlayPause(music)}
        />
        <div className="row">
          <span>{music.name}</span>
          <p>{music.author}</p>
        </div>
      </div>
      <div className="options">
        <Button
          btnName="like-btn"
          type="button"
          icon="fa-regular fa-heart"
          title="Like"
        />
        <Button
          btnName="remove-btn"
          type="button"
          icon="fa fa-xmark"
          title="Remove"
        />
      </div>
    </li>
  );
}
