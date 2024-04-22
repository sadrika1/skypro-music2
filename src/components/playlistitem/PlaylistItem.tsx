import Link from "next/link";
import styles from "./playlistitem.module.css";

type PlaylistItemType = {
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
};

export default function PlaylistItem({
  name,
  author,
  album,
  duration_in_seconds,
}: PlaylistItemType) {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.trackTitleLink} href="#">
              {name} <span className={styles.trackTitleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <Link className={styles.trackAuthorLink} href="#">
            {author}
          </Link>
        </div>
        <div className={styles.trackAlbum}>
          <Link className={styles.trackAlbumLink} href="#">
            {album}
          </Link>
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
