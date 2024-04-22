import classNames from "classnames";
import styles from "./searchFilter.module.css";

type FilterItmeType = {
  title: string;
  list: string[];
  handleFilterClick: (newFilter: string) => void;
  isOpen: boolean;
};

export default function FilterItem({
  handleFilterClick,
  title,
  list,
  isOpen,
}: FilterItmeType) {
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
            {list.map((item) => (
              <li key={item} className={styles.dropdownItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
