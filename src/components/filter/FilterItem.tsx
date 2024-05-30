import classNames from "classnames";
import styles from "./searchFilter.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { order } from "./data";
import { setFilters } from "@/store/features/playlistSlice";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpen: boolean;
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpen,
}: FilterItemType) {
  const dispatch = useAppDispatch();
  const tracksData = useAppSelector((state) => state.playlist.initialTracks);
  const optionList = useAppSelector(
    (state) => state.playlist.filterOptions[value]
  );

  const getFilterList = () => {
    if (value !== "order") {
      const array = new Set(
        tracksData?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }
    return order;
  };
  const toggleFilter = (item: string) => {
    if (value === "order") {
      dispatch(setFilters({ order: item }));
      return;
    }
    dispatch(
      setFilters({
        [value]: optionList.includes(item)
          ? (optionList as string[]).filter((el) => el !== item)
          : [...(optionList as string[]), item],
      })
    );
  };

  getFilterList();

  return (
    <div className={styles.filtersContainer}>
      <div
        className={classNames(styles.filterButton, { [styles.active]: isOpen })}
        onClick={() => handleFilterClick(title)}
      >
        {title}
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul>
            {getFilterList().map((item) => (
              <li
                onClick={() => toggleFilter(item)}
                className={styles.dropdownItem}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
