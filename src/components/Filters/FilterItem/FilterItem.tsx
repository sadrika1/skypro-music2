import classNames from "classnames";
import styles from "./FilterItem.module.css";
import { trackType } from "@/types";
import { order } from "../data";
import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { setFilters } from "@/store/features/playListSlice";
import { useEffect, useMemo, useState } from "react";

type FilterItemType = {
  title: string;
  value: "author" | "genre" | "order";
  handleFilterClick: (newFilter: string) => void;
  isOpen: boolean;

  optionList: string[] | string;
};

export default function FilterItem({
  handleFilterClick,
  title,
  value,
  isOpen,
  optionList,
}: FilterItemType) {
  const [filterNumber, SetFilterNumber] = useState<number>(0);
  const playlist = useAppSelector(
    (state) => state.playlist.initialPlaylistItems
  );
  const dispatch = useAppDispatch();

  const filteredList = useMemo(() => {
    if (value !== "order") {
      const array = new Set(
        playlist?.map((track: trackType) => track[value]) || []
      );
      return Array.from(array);
    }

    return order;
  }, [playlist, value]);

  const toggleFilter = (item: string) => {
    if (value !== "order" && optionList && optionList instanceof Array) {
      dispatch(
        setFilters({
          [value]: optionList.includes(item)
            ? optionList.filter((el) => el !== item)
            : [...optionList, item],
        })
      );
    } else {
      dispatch(setFilters({ order: item }));
    }
  };

  useEffect(() => {
    if (value !== "order" && optionList) SetFilterNumber(optionList.length);
  }, [optionList]);

  return (
    <>
      {isOpen ? (
        <div>
          <div className={styles.filterBlock}>
            <div
              onClick={() => handleFilterClick(title)}
              className={classNames(styles.filterButton, styles.btnText, {
                [styles.active]: isOpen,
              })}
            >
              {title}
            </div>
            {filterNumber > 0 && (
              <div className={styles.filterNumber}>{filterNumber}</div>
            )}
          </div>

          <div className={styles.filterResultBlock}>
            <ul className={styles.filterResultUl}>
              {filteredList.map((item) => (
                <li
                  key={item}
                  onClick={() => toggleFilter(item)}
                  className={classNames(styles.filterResultLi, {
                    [styles.filterResultLiActive]:
                      value === "order"
                        ? item === optionList
                        : optionList.includes(item),
                  })}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleFilterClick(title)}
          className={classNames(styles.filterButton, styles.btnText, {
            [styles.active]: isOpen,
          })}
        >
          {title}
        </div>
      )}
    </>
  );
}
