import PlayerControls from "./PlayerControls";
import styles from './barplayer.module.css'

export default function BarPlayer() {
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <PlayerControls />
            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>

                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="#">
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="#">
                    Баста
                  </a>
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
                <input
                  placeholder="text"
                  className="volume__progress-line _btn"
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
