"use client";
import classNames from "classnames";
import styles from "./PlaylistItem.module.css";
import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { trackType } from "@/types";
import {
  setCurrentPlaylistItem,
  setInitialPlaylistItems,
  setIsPlaylistItemPlaying,
  setLikedPlaylistItems,
} from "@/store/features/playListSlice";
import { formatSecondsToMMSS } from "@/app/lib/formatSecondsToMMSS";
import { useEffect, useMemo, useState } from "react";
import {
  addFavoritePlaylistItems,
  deleteFavoritePlaylistItems,
  getPlaylistItems,
  refreshToken,
} from "@/api/tracks";
import { DEFAULT_USER, setToken, setUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export type PlaylistItemType = {
  trackData: trackType;
};

export default function PlaylistItem({ trackData }: PlaylistItemType) {
  const dispatch = useAppDispatch();
  //получаем текущий трек из store
  const { currentPlaylistItem, isPlaying } = useAppSelector(
    (state) => state.playlist
  );
  const tracksData = useAppSelector(
    (state) => state.playlist.initialPlaylistItems
  );

  const tokens = useAppSelector((state) => state.user.tokens);
  const likedPlaylistItems = useAppSelector(
    (state) => state.playlist.likedPlaylistItemes
  );
  const router = useRouter();

  const { name, author, album, duration_in_seconds, id } = trackData;

  const handlePlaylistItemClick = () => {
    dispatch(setCurrentPlaylistItem({ trackData, tracksData }));
    dispatch(setIsPlaylistItemPlaying(!isPlaying));
  };

  const userId = useAppSelector((state) => state.user.user.id);
  const [isLikePlaylistItem, setIsLikePlaylistItem] = useState(false);
  const isLike = Boolean(
    trackData?.stared_user
      ? trackData?.stared_user.find((el) => el.id === userId)
      : []
  );

  useEffect(() => {
    setIsLikePlaylistItem(isLike);
  }, [trackData]);

  const handleLikePlaylistItem = () => {
    if (!tokens.access) {
      alert("необходимо авторизоватся");
      return;
    }
    setIsLikePlaylistItem(!isLikePlaylistItem);

    const likeFunc = isLikePlaylistItem
      ? deleteFavoritePlaylistItems
      : addFavoritePlaylistItems;

    likeFunc(trackData.id, tokens.access)
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
    <div className={styles.playlistItem}>
      <div className={styles.playlistPlaylistItem}>
        <div onClick={handlePlaylistItemClick} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentPlaylistItem?.id === id ? (
              isPlaying ? (
                <div className={styles.playingDot}></div>
              ) : (
                <div className={styles.pauseDot}></div>
              )
            ) : (
              <div>
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                </svg>
              </div>
            )}
          </div>

          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>

        <div onClick={handlePlaylistItemClick} className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>

        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>

        <div className={classNames(styles.trackTime, styles.btnIcon)}>
          <svg onClick={handleLikePlaylistItem} className={styles.trackTimeSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLikePlaylistItem ? "icon-like-active" : "icon-like"
              }`}
            />
          </svg>
          <span className={styles.trackTimeText}>
            {formatSecondsToMMSS(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
