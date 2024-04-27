"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
// import PlayerControls from "./PlayerControls";
import styles from "./barplayer.module.css";
import ProgressBar from "./progressbar/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setNextTrack,
  setPrevtrack,
  toggleShuffle,
} from "@/store/features/playlistSlice";
import VolumeRange from "./volume/VolumeRange";

export default function BarPlayer() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);

  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState<boolean>(false);

  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(30);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

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

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setVolume(Number(e.target.value));
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

 

  // const handleEnded = () => {
  //     // Проверяем, не является ли текущий трек последним в плейлисте
  //     if (currentTrackIndex < playlist.length - 1) {
  //         // Переход к следующему треку
  //         setCurrentTrackIndex(currentTrackIndex + 1);
  //     } else {
  //         // Или начинаем плейлист с начала
  //         setCurrentTrackIndex(0);
  //     }
  // };

  // // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  // useEffect(() => {
  //     const audio = audioRef.current;
  //     audio.src = playlist[currentTrackIndex].url;
  //     audio.addEventListener('ended', handleEnded);

  //     // Воспроизводим новый трек
  //     audio.play();

  //     return () => {
  //         audio.removeEventListener('ended', handleEnded);
  //     };
  // }, [currentTrackIndex, playlist]);

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div> {currentTime}</div>
          <div>{duration}</div>
          <div className={styles.barContent}>
            <audio
              // autoPlay
              ref={audioRef}
              src={currentTrack.track_file}
              loop={isLoop}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
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
                    onClick={() => dispatch(toggleShuffle())}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use
                        xlinkHref={`img/icon/sprite.svg#${
                          isShuffle ? "icon-shuffle-active" : "icon-shuffle"
                        }`}
                      ></use>
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
                  <div className={styles.volumeProgress}>
                    <VolumeRange
                      min={0}
                      max={100}
                      value={volume}
                      step={0.01}
                      onChange={handleVolumeChange}
                    />
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
