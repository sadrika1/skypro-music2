'use client'
import { useState } from "react";
import FilterItem from "./FilterItem";
import styles from "./searchFilter.module.css";

const filters = [
  {
    title: "Исполнитель",
    list: ['kek', 'cheburek'],
  },
  {
    title: "Год выпуска",
    list: ['2007', '2011'],
  },
  {
    title: "Жанр",
    list: ['rock', 'pop'],
  },
];

export default function SearchFilter() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const handleFilterClick = (newFilter: string) => {
    setActiveFilter((prev) => (prev === newFilter ? null : newFilter));
  };

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filters.map((filter) => (
        <FilterItem
          key={filter.title}
          title={filter.title}
          list={filter.list}
          handleFilterClick={handleFilterClick}
          isOpen={activeFilter === filter.title}
        />
      ))}
    </div>
  );
}

// оптимизация - прогнать фильтры через map
