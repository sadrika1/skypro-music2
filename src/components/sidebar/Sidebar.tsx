import Link from "next/link";
import styles from "./sidebar.module.css";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <Link href="/signin">
            <svg>
              <use xlinkHref="img/icon/sprite.svg#logout"></use>
            </svg>
          </Link>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={300}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={300}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={300}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
