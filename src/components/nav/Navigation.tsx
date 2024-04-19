"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./navigation.module.css";

export default function Navigation() {
  const [menuActive, setMenuActive] = useState(false); // по дефолту меню закрыто
  const menuClose = () => {
    setMenuActive(!menuActive);
  };
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          className="logo__image"
          src="/img/logo.png"
          alt="logo"
          width={113}
          height={19}
        />
      </div>
      <div className={styles.nav__burger} onClick={menuClose}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {menuActive && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <a href="#" className={styles.menu__link}>
                Главное
              </a>
            </li>
            <li className={styles.menu__item}>
              <a href="#" className={styles.menu__link}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menu__item}>
              <a href="../signin.html" className={styles.menu__link}>
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
