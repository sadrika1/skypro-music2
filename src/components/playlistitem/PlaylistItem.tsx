import Link from 'next/link'
import styles from './playlistitem.module.css'

export default function PlaylistItem() {
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
              <a className={styles.trackTitleLink} href="#">
                I’m Fire <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <Link className={styles.trackAuthorLink} href="#">
              Ali Bakgor
            </Link>
          </div>
          <div className={styles.trackAlbum}>
            <Link className={styles.trackAlbumLink} href="#">
              I’m Fire
            </Link>
          </div>
          <div className="track__time">
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>2:22</span>
          </div>
        </div>
      </div>
    )
}