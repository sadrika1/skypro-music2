"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
// import PlayerControls from "./PlayerControls";
import styles from "./barplayer.module.css";
import { trackType } from "@/types";
import ProgressBar from "./progressbar/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setIsShuffle,
  setNextTrack,
  setPrevtrack,
} from "@/store/features/playlistSlice";

export default function BarPlayer() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState<boolean>(false);

  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const duration = audioRef.current?.duration;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
  }, []);

  const toggleLoop = () => {
    setIsLoop((repeat) => !repeat);
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              autoPlay
              ref={audioRef}
              src={currentTrack.track_file}
              loop={isLoop}
            ></audio>
            <ProgressBar
              max={duration}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />

            <div className={styles.barPlayerBlock}>
              <div className={styles.barPlayer}>
                <div className={styles.playerControls}>
                  <div
                    className={styles.playerBtnPrev}
                    onClick={() => dispatch(setPrevtrack())}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={styles.playerBtnPlay}>
                    <svg
                      className={styles.playerBtnPlaySvg}
                      onClick={togglePlay}
                    >
                      <use
                        xlinkHref={`img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                      ></use>
                    </svg>
                  </div>
                  <div
                    className={styles.playerBtnNext}
                    onClick={() => dispatch(setNextTrack())}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className={styles.playerBtnRepeat} onClick={toggleLoop}>
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use
                        xlinkHref={`img/icon/sprite.svg#${
                          isLoop ? "icon-repeat-active" : "icon-repeat"
                        }`}
                      ></use>
                    </svg>
                  </div>
                  <div
                    className={styles.playerBtnShuffle}
                    // onClick={() => dispatch(setIsShuffle(true))}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className={styles.playerTrackPlay}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use></use>
                      </svg>
                    </div>

                    <div className={styles.trackPlayAuthor}>
                      <span className={styles.trackPlayAuthorLink}>
                        {currentTrack.name}
                      </span>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <span className={styles.trackPlayAlbumLink}>
                        {currentTrack.author}
                      </span>
                    </div>
                  </div>

                  <div className={styles.likesBlock}>
                    <div className={styles.trackPlayLike}>
                      <svg className={styles.trackPlayLikeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className={styles.trackPlayDislike}>
                      <svg className={styles.trackPlayDislikeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.barVolumeBlock}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImg}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className="volume__progress _btn">
                    <input type="range" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
