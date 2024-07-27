 'use client';
import BarPlayer from "@/components/BarPlayer/Barplayer";
 import styles from "./error.module.css"


import { useEffect } from 'react';

import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";

type ErrorType={
error: Error,
reset:()=>void,
}

export default function Error({ error, reset }:ErrorType) {
  useEffect(() => {
    // Логирование ошибки
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav></Nav>
        <div className={styles.mainCenterblock}>
          <Search></Search>
          <div className={styles.errorH2}>404</div>
          <div className={styles.errorSubttl}>
            Страница не найдена 😭
       
          </div>
          <div className={styles.errorShadedText}>
            Возможно, она была удалена <br /> или перенесена на другой адрес
          </div>
          <button onClick={reset} className={styles.errorButton}>
            Вернуться на главную
          </button>
        </div>
      </main>
      <BarPlayer></BarPlayer>
      <footer className="footer" />
    </div>
  </div>
);
}

