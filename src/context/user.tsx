import { userType } from "@/types";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

type contextType = {
  user: null | userType;
  login: (newUser: userType, token: any) => void;
  logout: () => void;
};
const initialValues: contextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext(initialValues);
export const useUserContext = () => useContext(UserContext);

function getUserFromLS({ item }: { item: string }) {
  try {
    return JSON.parse(localStorage.getItem(item) || "");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(getUserFromLS({ item: "user" }));
  const login = (newUser: userType, token: any) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
