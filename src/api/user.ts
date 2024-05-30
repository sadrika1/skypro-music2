// import { userType } from "@/types";

// const GET_TOKEN = "https://skypro-music-api.skyeng.tech/user/token/";
// const REFRESH_TOKEN =
//   "https://skypro-music-api.skyeng.tech/user/token/refresh/";
// const LOGIN = "https://skypro-music-api.skyeng.tech/user/login/";
// const SIGNUP = "https://skypro-music-api.skyeng.tech/user/signup/";

// export async function getToken({ email, password }: userType) {
//   fetch(GET_TOKEN, {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       "content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }

// export async function refreshToken({ refresh }: userType) {
//   fetch(REFRESH_TOKEN, {
//     method: "POST",
//     body: JSON.stringify({
//       refresh,
//     }),
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       "content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }

// export async function loginUser({ email, password }: userType) {
//   await fetch(LOGIN, {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       "content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// }

// export async function signUp({ email, password, username }: userType) {
//   const response = await fetch(SIGNUP, {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//     }),
//     headers: {
//       // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
//       "content-type": "application/json",
//     },
//   });

//   try {
//     console.log("Регистрация успешна");
//   } catch (error) {
//     console.error("Ошибка регистрации:", error);
//   }
//   return await response.json();
// }
