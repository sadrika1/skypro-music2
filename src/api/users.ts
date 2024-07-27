import { Router } from "next/router";

const signupUrl = 'https://skypro-music-api.skyeng.tech/user/signup/'
const signinUrl = 'https://skypro-music-api.skyeng.tech/user/login/'

//ЗАРЕГИСТРИРОВАТЬСЯ
export async function signupApi({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const response = await fetch(signupUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    alert("Такой пользователь уже существует");
    //переадресация на стр регстр!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  }
  if (response.status === 500) {
    alert("Сервер сломался");
  }


  return response.json();
}


//Adminsadfsadf@mail.ru

//ВОЙТИ


export async function signinApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(signinUrl, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (response.status === 400) {
    throw new Error("Неверный логин или пароль");
  }
  if (response.status === 500) {
    throw new Error("Сервер сломался");
  }
  if (response.status===401){
    throw new Error("Пользователь с таким email или паролем не найден");
  }

  return response.json();
}






