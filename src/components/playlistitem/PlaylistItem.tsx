"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./playlistitem.module.css";
import { trackType } from "@/types";
import {
  setCurrentTrack,
  toggleIsPlaying,
} from "@/store/features/playlistSlice";

type PlaylistItemType = {
  track: trackType;
  tracksData: trackType[];
};

export default function PlaylistItem({ track, tracksData }: PlaylistItemType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, id } = track;
  const { isPlaying } = useAppSelector((store) => store.playlist);

  const dispatch = useAppDispatch();
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  return (
    <div onClick={handleTrackClick} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?.id === track.id && (
              <div
                className={`${
                  isPlaying ? styles.pulseCircle : styles.pulseCircleStop
                }`}
              ></div>
            )}
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <span className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className="track__time">
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>{duration_in_seconds}</span>
        </div>
      </div>
    </div>
  );
}
