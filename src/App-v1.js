import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (curSong) {
      document.body.style.background = getRandomGradient();
    }
  }, [curSong]);

  return (
    <div className="app">
      <DashBoard
        openList={openList}
        setOpenList={setOpenList}
        curSong={curSong}
        setCurSong={setCurSong}
        musicList={musicList}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <MusicList
        openList={openList}
        musicList={musicList}
        setMusicList={setMusicList}
        curSong={curSong}
        setCurSong={setCurSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

function DashBoard({
  openList,
  setOpenList,
  curSong,
  setCurSong,
  musicList,
  isPlaying,
  setIsPlaying,
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !curSong) return;
    // -- Only update the src if song changed --
    if (audio.src !== curSong.path) {
      audio.src = curSong.path;
      audio.load();
    }
    // -- Play or pause based on isPlaying state --
    if (isPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
    // -- Time update handler --
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    // -- Duration handler --
    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    // -- Song ended handler --
    const handleSongEnd = () => {
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
    };
    // -- Event listeners --
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);
    // -- Cleanup --
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [
    curSong,
    isPlaying,
    isRepeat,
    isShuffle,
    musicList,
    setCurSong,
    setIsPlaying,
  ]);

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

  // Seek to a specific time in the song
  const handleSeekTo = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  // Set volume based on slider input
  const handleVolume = (e) => {
    const volume = e.target.value / 100; // HTML handle 0-1
    audioRef.current.volume = volume;
    setVolume(Number(e.target.value)); // render 0-100
  };
  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) setIsRepeat(false); // Turn off repeat if shuffle is turned on
  };
  // Toggle repeat
  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (!isRepeat) setIsShuffle(false); // Turn off shuffle if repeat is turned on
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
    <div className="dash-board">
      <Menu
        openList={openList}
        setOpenList={setOpenList}
        musicList={musicList}
        curSong={curSong}
      />
      <MusicInfo curSong={curSong} isPlaying={isPlaying} />
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
      {/* button list */}
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
      {isPlaying && (
        <div className="sound-wave run">
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
          <span className="cane"></span>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
}

function Button({ btnName, type, icon, title, onClick, disabled }) {
  return (
    <button
      className={`${btnName ? btnName : ""} ${icon ? icon : ""}`}
      type={type}
      title={title ? title : ""}
      onClick={onClick}
      disabled={disabled ? disabled : ""}
    ></button>
  );
}

function Menu({ openList, setOpenList, musicList, curSong }) {
  function handleOpenList() {
    setOpenList(!openList);
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
      <div className="Start">
        PLAYING {musicList?.findIndex((song) => song.id === curSong.id) + 1} of{" "}
        {musicList?.length}
      </div>
      <Button
        icon="fa-regular fa-heart"
        type="button"
        onClick={() => {}}
        title="Like"
      />
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
      <div className="artist">By {curSong?.author || "author"}</div>
    </div>
  );
}

function Slider({ sliderName, children }) {
  return <div className={sliderName}>{children}</div>;
}

function MusicList({
  openList,
  musicList,
  setMusicList,
  curSong,
  setCurSong,
  isPlaying,
  setIsPlaying,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newSongs = files.map((file) => {
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`music-list ${openList ? "show" : ""}`}>
      <div className="header">
        <div className="title">
          <i className="fa fa-music"></i>
          <span>Music list</span>
        </div>
        <div>
          <button
            type="button"
            className="custom-file-upload"
            onClick={triggerFileInput}
          >
            <i className="fa fa-plus"></i> Add song
          </button>
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
      <ul>
        {musicList?.map((music, index) => (
          <Music
            num={index}
            music={music}
            curSongId={curSong.id}
            key={crypto.randomUUID()}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setCurSong={setCurSong}
          />
        ))}
      </ul>
    </div>
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
