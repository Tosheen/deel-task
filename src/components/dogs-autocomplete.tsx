import * as React from "react";

import { dogBreedsFetcher } from "../fetchers/dog-fetcher";
import { useAutocomplete } from "../hooks/useAutocomplete";

import styles from "./dogs-autocomplete.module.css";

export const DogsAutocomplete = () => {
  const [_breed, setBreed] = React.useState(""); // This state can be used as controlled state for forms etc

  const {
    value,
    onChange,
    items,
    highlightedIndex,
    makeSelection,
    onKeyUp,
    listRef,
    onListItemRefAdd,
  } = useAutocomplete(
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
      <ul className={styles.options} ref={listRef}>
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <li
                key={item}
                className={
                  index === highlightedIndex ? styles.highlighted : undefined
                }
                ref={onListItemRefAdd}
              >
                <button
                  onClick={() => {
                    makeSelection(item);
                  }}
                >
                  <ItemLabel item={item} needle={value} />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

type ItemLabelProps = {
  item: string;
  needle: string;
};

const ItemLabel = (props: ItemLabelProps) => {
  const highlightedPart = props.item
    .toLowerCase()
    .indexOf(props.needle.toLowerCase());

  const shouldBeHighligthed = highlightedPart > -1;

  if (shouldBeHighligthed === false) {
    return <span>{props.item}</span>;
  }

  const prefix = props.item.substring(0, highlightedPart);
  const suffix = props.item.substring(highlightedPart + props.needle.length);

  const originalNeedle = props.item.substring(
    highlightedPart,
    highlightedPart + props.needle.length
  );

  return (
    <span>
      <span>{prefix}</span>
      <strong>{originalNeedle}</strong>
      <span>{suffix}</span>
    </span>
  );
};
