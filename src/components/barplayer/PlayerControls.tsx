import styles from './barplayer.module.css'

export default function PlayerControls() {
  return (
    <div className={styles.playerControls}>
      <div className={styles.playerBtnPrev}>
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
        </svg>
      </div>
      <div className={styles.playerBtnPlay}>
        <svg className={styles.playerBtnPlaySvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
        </svg>
      </div>
      <div className={styles.playerBtnNext}>
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
        </svg>
      </div>
      <div className={styles.playerBtnRepeat}>
        <svg className={styles.playerBtnRepeatSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
        </svg>
      </div>
      <div className={styles.playerBtnShuffle}>
        <svg className={styles.playerBtnShuffleSvg}>
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
        </svg>
      </div>
    </div>
  );
}
