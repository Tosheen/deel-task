import * as React from "react";

import { dogBreedsFetcher } from "../fetchers/dog-fetcher";
import { useAutocomplete } from "../hooks/useAutocomplete";

import styles from "./dogs-autocomplete.module.css";

export const DogsAutocomplete = () => {
  const [_breed, setBreed] = React.useState(""); // This state can be used as controlled state for forms etc

  const { value, onChange, items, highlightedIndex, makeSelection, onKeyUp } =
    useAutocomplete(
      {
        minChars: 2,
        onSelectionChange: (searchKey) => {
          setBreed(searchKey);
        },
      },
      dogBreedsFetcher
    );

  return (
    <div className={styles.autocompleteWrapper}>
      <div className={styles.formGroup}>
        <label htmlFor="dog-breed">Dog Breeds:</label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </div>
      <ul className={styles.options}>
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <li
                key={item}
                className={
                  index === highlightedIndex ? styles.highlighted : undefined
                }
              >
                <button
                  onClick={() => {
                    makeSelection(item);
                  }}
                >
                  {item}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
