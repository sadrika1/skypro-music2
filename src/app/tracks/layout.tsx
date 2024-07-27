import BarPlayer from "@/components/BarPlayer/Barplayer";

import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./layout.module.css";
import Search from "@/components/Search/Search";

export default function PlaylistItemsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />

            {children}
          </div>
          <Sidebar />
        </main>
        <BarPlayer />
        <footer className={styles.footer} />
      </div>
    </div>
  );
}
