import styles from "./page.module.css";
import Navigation from "@/components/nav/Navigation";
import Search from "@/components/search/Search";
import BarPlayer from "@/components/barplayer/BarPlayer";
import Sidebar from "@/components/sidebar/Sidebar";
import SearchFilter from "@/components/filter/SearchFilter";
import Playlist from "@/components/playlist/Playlist";

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
            <Playlist />
          </div>
          <Sidebar />
        </main>
      </div>
      <BarPlayer />
    </div>
  );
}
