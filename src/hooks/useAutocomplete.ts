import * as React from "react";

import type { Fetcher } from "../fetchers/interface";

import { debounce } from "../util/debounce";

type AutocompleteOptions = {
  minChars: number;
  onSelectionChange?: (searchKey: string) => void;
  onInputValueChange?: (searchKey: string) => void;
};

export function useAutocomplete(
  options: AutocompleteOptions,
  fetcher: Fetcher
) {
  const [searchKey, setSearchKey] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const debouncedFetcher = React.useMemo(
    () =>
      debounce(async (searchKey: string) => {
        const results = await fetcher(searchKey);
        setItems(results);
      }, 200),
    []
  );

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = event.target.value;
    setSearchKey(searchKey);

    if (searchKey.length >= options.minChars) {
      debouncedFetcher(searchKey);
    } else {
      setItems([]);
    }
  };

  const makeSelection = (item: string) => {
    setSearchKey(item);

    setItems([]);

    if (options.onSelectionChange != null) {
      options.onSelectionChange(item);
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (items.length === 0) return;

    if (event.key === "ArrowUp") {
      if (highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      } else {
        setHighlightedIndex(items.length - 1);
      }
    }

    if (event.key === "ArrowDown") {
      if (highlightedIndex < items.length - 1) {
        setHighlightedIndex(highlightedIndex + 1);
      } else {
        setHighlightedIndex(0);
      }
    }

    if (event.key === "Enter") {
      if (items[highlightedIndex] !== undefined) {
        makeSelection(items[highlightedIndex]);
      }
    }
  };

  return {
    value: searchKey,
    onChange: onChange,
    items,
    highlightedIndex,
    makeSelection,
    onKeyUp,
  };
}
