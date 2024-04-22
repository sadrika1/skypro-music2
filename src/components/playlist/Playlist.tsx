import PlaylistItem from "@/components/playlistitem/PlaylistItem";
import styles from "./Playlist.module.css";
import { getAllTracks } from "@/api/tracks";
import { trackType } from "@/types";

export default async function Playlist() {
  let tracksData: trackType[];
  try {
    tracksData = await getAllTracks();
  } catch (error : any) {
    throw new Error(error.message);
  }

  return (
    <div className={styles.centerblockContent}>
      <div className={styles.contentTitle}>
        <div className={styles.playlistTitle1}>Трек</div>
        <div className={styles.playlistTitle2}>Исполнитель</div>
        <div className={styles.playlistTitle3}>Альбом</div>
        <div className={styles.playlistTitle4}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={styles.contentPlayllist}>
        {tracksData.map((track) => (
          <PlaylistItem
            name={track.name}
            album={track.album}
            author={track.author}
            duration_in_seconds={track.duration_in_seconds}
          />
        ))}
      </div>
    </div>
  );
}
