"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useUserContext } from "@/context/user";
import { useState } from "react";
import { signUp } from "@/api/user";

export default function SignUnPage() {
  const { login } = useUserContext();
  const [signupData, setSignupData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение

    setSignupData({
      ...signupData, // Копируем текущие данные из состояния
      [name]: value, // Обновляем нужное поле
    });
  };


  // const handleSignup = async (e: any) => {
  //   e.preventDefault();
  //   if (!signupData.login || !signupData.password || !signupData.name) {
  //     setError("Заполните обязательные поля");
  //     return;
  //   }
  //   try {
  //     await fetchReg(signupData).then((data) => {
  //       login(data.user);
  //       console.log("Correct!", data);
  //     });
  //     navigate(appRoutes.HOME);
  //   } catch (error) {
  //     console.error("Ошибка регистрации:", error);
  //     setError(error.message || "Неизвестная ошибка регистрации");
  //   }
  // };

  // useEffect(() => {
  //   setError(null);
  // }, [registerData]);

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
