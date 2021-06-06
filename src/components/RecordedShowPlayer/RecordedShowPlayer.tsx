import React, { useRef, useEffect } from "react";
import { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  backgroundImage: string;
  recordingDate: string;
}

enum PlayerStates {
  Playing = "PLAYING",
  Paused = "PAUSED",
}
export const RecordedShowPlayer: React.FC<RecordedShowPlayerProps> = (
  props
) => {
  const audioRef = useRef(new Audio(props.url));
  const [playerState, setPlayerState] = useState<PlayerStates>(
    PlayerStates.Paused
  );
  const [currentTime, setCurrentTime] = useState(0);
  const play = () => {
    setPlayerState(PlayerStates.Playing);
    audioRef.current.play();
  };
  const pause = () => {
    setPlayerState(PlayerStates.Paused);
    audioRef.current.pause();
  };

  const debouncedSetTime = (time: number) => {
    audioRef.current.currentTime = time;
  };

  const togglePlayPause = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    playerState === PlayerStates.Paused ? play() : pause();
  };
  useEffect(() => {
    const currentPlayer = audioRef.current;
    if (playerState === PlayerStates.Playing) {
      currentPlayer.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
    return () => {
      currentPlayer.removeEventListener("timeupdate", () => null);
    };
  }, [playerState]);

  useEffect(() => {
    const currentPlayer = audioRef.current;
    return () => {
      currentPlayer.src = "";
    };
  }, []);

  return (
    <div
      className={style.RecordedShowPlayer}
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
    >
      <div className={style.titleWrapper}>
        <h5
          className={style.RecordedShowTitle}
          data-testid="recorded-show-title"
        >
          {props.name}
        </h5>
        <p data-testid="recorded-show-date" className={style.uploadedAt}>
          {Intl.DateTimeFormat("he").format(new Date(props.recordingDate))}
        </p>
      </div>
      <div className={style.controlsWrapper}>
        <button
          className={style.playPauseBtn}
          onClick={togglePlayPause}
          data-testid="play-pause-button"
        >
          {playerState === PlayerStates.Paused ? (
            <FontAwesomeIcon icon={faPlay} size="3x" color="#ffffff" />
          ) : (
            <FontAwesomeIcon icon={faPause} size="3x" color="#ffffff" />
          )}
        </button>
        <input
          min={0}
          max={audioRef.current.duration || 100}
          value={audioRef.current.currentTime}
          type="range"
          className={style.progressBar}
          onChange={(e) => debouncedSetTime(parseInt(e.target.value))}
        />
        <span className={style.duration}>
          {new Date(currentTime * 1000).toISOString().substr(14, 6)}
        </span>
      </div>
    </div>
  );
};
