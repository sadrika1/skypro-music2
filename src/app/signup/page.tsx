import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function SignUnPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
            <Link href="/">
              <div className={styles.modalLogo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={113}
                  height={17}
                />
              </div>
            </Link>
            <input
              className={styles.modalInput}
              type="text"
              name="login"
              placeholder="Почта"
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              className={styles.modalInput}
              type="password"
              name="password"
              placeholder="Повторите пароль"
            />
            <button className={styles.modalBtnSignup}>
              <Link href="/signup">Зарегистрироваться</Link>
            </button>
            <div className={styles.textSignIn}>
              Уже зарегистрированы? <Link href="/signin">Войти здесь</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
