'use client'
import Image from "next/image"
import styles from "./Nav.module.css"
import { memo, useState } from "react"
import Link from "next/link"

function Nav() {
  const [isOpened, setIsOpend] = useState<boolean>(false)


  return (
    <nav className={styles.mainNav}>
      <Link href="/">
      <div className={styles.navLogo}>
        <Image
          alt="логотип skypro-music"
          width={113}
          height={17}
          className={styles.logoImage}
          src="/img/logo.png"
        />
      </div>
      </Link>
      <div onClick={() => setIsOpend((prev) => !prev)} className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpened && (<div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/tracks/favourite" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/signin" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
        )
      }
    </nav>
  )
}

export default memo(Nav)