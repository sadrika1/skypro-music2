"use client"
import { ChangeEvent, memo, useState } from "react"
import styles from "./Search.module.css"

import { useAppDispatch } from "@/components/hooks"
import { setFilters } from "@/store/features/playListSlice"

function Search() {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useAppDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    dispatch(setFilters({ searchValue: e.target.value }))
  }
  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name={searchValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default memo(Search)