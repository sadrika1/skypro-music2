"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./navigation.module.css";
import Link from "next/link";

export default function Navigation() {
  const [menuActive, setMenuActive] = useState<Boolean>(false);

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImg}
          src="/img/logo.png"
          alt="logo"
          width={113}
          height={19}
        />
      </div>
      <div className={styles.navBurger} onClick={() => setMenuActive(!menuActive)}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {menuActive && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="#" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="#" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="#" className={styles.menuLink}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
