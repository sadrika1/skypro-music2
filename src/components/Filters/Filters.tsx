'use client'
import { useState } from "react"
import FilterItem from "./FilterItem/FilterItem"
import styles from "./Filters.module.css"
import { filters } from "./data"

import { useAppSelector } from "@/components/hooks"


export default function Filters() {
  const { author, genre, order } = useAppSelector(
    (store) => store.playlist.filretOptions
  )
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => prev === newFilter ? null : newFilter)
  }
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <FilterItem

        isOpen={activeFilter === filters[0].title}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}

        optionList={author}
      />
      <FilterItem

        isOpen={activeFilter === filters[1].title}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}

        optionList={genre}
      />
      <FilterItem

        isOpen={activeFilter === filters[2].title}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}

        optionList={order}
      />

    </div>
  )
}