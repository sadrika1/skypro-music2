
import { ChangeEvent, memo } from "react";
import styles from "./Volume.module.css";
import classNames from "classnames";

type VolumeBarType = {
    min:number | undefined,
    max: number | undefined,
    value: number,
    step: number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    
}
function Volume({ min = 0, max=1, value, step, onChange }: VolumeBarType) {
    return (
        <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
                <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                </div>
                <div className={classNames(styles.volumeProgress, styles.btn)}>
                    <input
                        className={classNames(styles.volumeProgressLine, styles.btn)}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}
export default memo(Volume)