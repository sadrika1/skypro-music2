import styles from "./page.module.css";
import Navigation from "@/components/nav/Navigation";
import Search from "@/components/search/Search";
import BarPlayer from "@/components/barplayer/BarPlayer";
import Sidebar from "@/components/sidebar/Sidebar";
import SearchFilter from "@/components/filter/SearchFilter";
import PlaylistItem from "@/components/playlistitem/PlaylistItem";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={styles.mainCentroblock}>
            <Search />
            <h2 className={styles.centerblockTitle}>Треки</h2>
            <SearchFilter />
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
                <PlaylistItem />
              </div>
            </div>
          </div>
          <Sidebar />
        </main>
      </div>
      <BarPlayer />
    </div>
  );
}
