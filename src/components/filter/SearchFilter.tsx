"use client";
import { useState } from "react";
import FilterItem from "./FilterItem";
import styles from "./searchFilter.module.css";
import { filters } from "./data";
// import { trackType } from "@/types";
// import { useAppSelector } from "@/hooks";

export default function SearchFilter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  // const tracksData = useAppSelector((state) => state.playlist.initialTracks);
  const handleFilterClick = (newFilter: string) => {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  };

  console.log(filters);
  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        title={filters[0].title}
        value={filters[0].value}
        handleFilterClick={handleFilterClick}
        isOpen={activeFilter === filters[0].title}
       
      />
      <FilterItem
        title={filters[1].title}
        value={filters[1].value}
        handleFilterClick={handleFilterClick}
        isOpen={activeFilter === filters[1].title}
      />
      <FilterItem
        title={filters[2].title}
        value={filters[2].value}
        handleFilterClick={handleFilterClick}
        isOpen={activeFilter === filters[2].title}
      />
    </div>
  );
}

// оптимизация - прогнать фильтры через map
