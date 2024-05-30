"use client";
import { useAppDispatch } from "@/hooks";
import styles from "./search.module.css";
import { ChangeEvent, useState } from "react";
import { setFilters } from "@/store/features/playlistSlice";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dispatch(setFilters({ searchValue: e.target.value }));
  };
  return (
    <div className={styles.centerBlockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchValue}
        onChange={HandleChange}
      />
    </div>
  );
}
