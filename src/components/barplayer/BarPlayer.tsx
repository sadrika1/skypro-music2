"use client";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./BarPlayer.module.css";
import classNames from "classnames";

import ProgressBar from "../ProgressBar/ProgressBar";
import Volume from "../Volume/Volume";
import { useAppDispatch, useAppSelector } from "@/components/hooks";

import {
  setIsShuffle,
  setNextPlaylistItem,
  setPrevPlaylistItem,
  setIsPlaylistItemPlaying,
  setCurrentPlaylistItemIndex,
  setLikedPlaylistItems,
  setInitialPlaylistItems,
} from "@/store/features/playListSlice";
import { formatSecondsToMMSS } from "@/app/lib/formatSecondsToMMSS";
import {
  addFavoritePlaylistItems,
  deleteFavoritePlaylistItems,
  getPlaylistItems,
  refreshToken,
} from "@/api/tracks";

import { DEFAULT_USER, setToken, setUser } from "@/store/features/userSlice";

export default function BarPlayer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentPlaylistItem = useAppSelector(
    (state) => state.playlist.currentPlaylistItem
  );
  const currentPlaylistItemIndex = useAppSelector(
    (state) => state.playlist.currentPlaylistItemIndex
  );
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const isPlaylistItemPlaying = useAppSelector(
    (state) => state.playlist.isPlaying
  );

  const playlist = useAppSelector((state) => state.playlist.playlist);

  const tokens = useAppSelector((state) => state.user.tokens);
  const likedPlaylistItems = useAppSelector(
    (state) => state.playlist.likedPlaylistItemes
  );

  // использование useRef для доступа а audio
  const audioRef = useRef<null | HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState(0);

  const userId = useAppSelector((state) => state.user.user.id);
  const [isLikePlaylistItem, setIsLikePlaylistItem] = useState(false);
  const isLike = Boolean(
    currentPlaylistItem?.stared_user
      ? currentPlaylistItem?.stared_user.find((el) => el.id === userId)
      : []
  );

  useEffect(() => {
    setIsLikePlaylistItem(isLike);
  }, [currentPlaylistItem]);

  const duration = audioRef.current?.duration;
  //функция для воспроизведения и паузы
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaylistItemPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(setIsPlaylistItemPlaying(!isPlaylistItemPlaying));
    }
  };
  //обернула диспатчи соответствующих функций в функции hendle
  const handleNextPlaylistItem = () => {
    dispatch(setNextPlaylistItem());
  };
  //обернула диспатчи соответствующих функций в функции hendle
  const handlePrevPlaylistItem = () => {
    dispatch(setPrevPlaylistItem());
  };

  const [isLoop, setIsLoop] = useState<boolean>(false);
  const toggleLoop = () => {
    setIsLoop((prev) => !prev);
  };

  const [volume, setVolume] = useState<number>(0.1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => {
      if (audioRef.current?.currentTime) {
        setCurrentTime(audioRef.current?.currentTime);
      }
    });
  }, [audioRef.current?.currentTime, currentPlaylistItem?.id]);

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  //чтобы плэй срабатывал при плике на трэк
  useEffect(() => {
    if (isPlaylistItemPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentPlaylistItem?.id, isPlaylistItemPlaying]);

  //обнуление currenttime (value) чтобы прогресс бар обнулялся при клике на трек
  useEffect(() => {
    setCurrentTime(0);
  }, [currentPlaylistItem?.id]);

  const handleEnded = useCallback(() => {
    if (currentPlaylistItemIndex || currentPlaylistItemIndex === 0) {
      // Проверяем, не является ли текущий трек последним в плейлисте
      if (currentPlaylistItemIndex < playlist.length - 1) {
        // Переход к следующему треку
        dispatch(setCurrentPlaylistItemIndex(currentPlaylistItemIndex + 1));
      } else {
        // Или начинаем плейлист с начала
        dispatch(setCurrentPlaylistItemIndex(0));
      }
    }
  }, [currentPlaylistItemIndex, playlist, dispatch]);

  //     // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentPlaylistItemIndex, handleEnded]);

  // //NEW

  const handleLikePlaylistItem = () => {
    if (!currentPlaylistItem?.id) {
      return;
    }
    if (!tokens.access) {
      alert("необходимо авторизоватся");
      return;
    }
    setIsLikePlaylistItem(!isLikePlaylistItem);

    const likeFunc = isLikePlaylistItem
      ? deleteFavoritePlaylistItems
      : addFavoritePlaylistItems;

    likeFunc(currentPlaylistItem.id, tokens.access)
      .then(() => {
        return getPlaylistItems();
      })
      .then((res) => {
        dispatch(setInitialPlaylistItems(res.tracks));
      })
      .catch((error) => {
        if (error.message === "401") {
          refreshToken(tokens.refresh)
            .then((data) => {
              dispatch(
                setToken({
                  refresh: tokens.refresh,
                  access: data.access,
                })
              );
            })
            .catch(() => {
              dispatch(setUser(DEFAULT_USER));
              dispatch(
                setToken({
                  access: "",
                  refresh: "",
                })
              );
              router.push("/signin");
            });
        }
      });
  };

  return (
    <>
      {currentPlaylistItem && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              id="audio-id"
              ref={audioRef}
              src={currentPlaylistItem.track_file}
              loop={isLoop}
            ></audio>

            {!isNaN(Number(duration)) && (
              <div className={styles.timeBlock}>
                {formatSecondsToMMSS(currentTime)}/
                {formatSecondsToMMSS(Number(duration))}
              </div>
            )}

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
                    onClick={handlePrevPlaylistItem}
                    className={classNames(styles.playerBtnPrev, styles.btn)}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div
                    onClick={togglePlay}
                    className={classNames(styles.playerBtnPlay, styles.btn)}
                  >
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaylistItemPlaying ? "icon-pause" : "icon-play"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={handleNextPlaylistItem}
                    className={classNames(styles.playerBtnNext, styles.btn)}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toggleLoop}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isLoop ? "icon-repeat-active" : "icon-repeat"
                        }`}
                      />
                    </svg>
                  </div>

                  <div
                    onClick={() => dispatch(setIsShuffle(!isShuffle))}
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.btnIcon
                    )}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      {/*<use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />*/}

                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isShuffle ? "icon-shuffle-active" : "icon-shuffle"
                        }`}
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.playerPlaylistItemPlay}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <a className={styles.trackPlayAuthorLink} href="http://">
                        {currentPlaylistItem.author}
                      </a>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <a className={styles.trackPlayAlbumLink} href="http://">
                        {currentPlaylistItem.name}
                      </a>
                    </div>
                  </div>
                  <div className={styles.trackPlayLikeDis}>
                    <div
                      className={classNames(
                        styles.trackPlayLike,
                        styles.btnIcon
                      )}
                      onClick={handleLikePlaylistItem}
                    >
                      <svg className={styles.trackPlayLikeSvg}>
                        <use
                          xlinkHref={`/img/icon/sprite.svg#${
                            isLikePlaylistItem
                              ? "icon-like-active"
                              : "icon-like"
                          }`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <Volume
                min={0}
                max={1}
                value={volume}
                step={0.01}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
