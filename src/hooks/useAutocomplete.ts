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

  const listRef = React.useRef<HTMLUListElement | null>(null);
  const listItemRef = React.useRef<HTMLLIElement[]>([]);

  const onListItemRefAdd = (element: HTMLLIElement | null) => {
    if (element != null) {
      if (listItemRef.current.find((e) => e === element) === undefined) {
        listItemRef.current.push(element);
      }
    }
  };

  React.useEffect(() => {
    const hasIOSupport = "IntersectionObserver" in window;

    if (hasIOSupport === false) return;

    let observer = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          if (element.isIntersecting === false) {
            element.target.scrollIntoView({
              block: "nearest",
            });
          }
        });
      },
      {
        root: listRef.current,
        threshold: 0.5,
      }
    );

    if (listRef.current != null) {
      const optionItem = listItemRef.current[highlightedIndex];

      if (optionItem != null) {
        observer.observe(optionItem);
      }
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [highlightedIndex]);

  const debouncedFetcher = React.useMemo(
    () =>
      debounce(async (searchKey: string) => {
        const results = await fetcher(searchKey);
        console.log({
          i: listItemRef.current,
        });
        listItemRef.current = [];
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

    let nextHighlightedIndex: number | undefined;

    if (event.key === "ArrowUp") {
      if (highlightedIndex > 0) {
        nextHighlightedIndex = highlightedIndex - 1;
      } else {
        nextHighlightedIndex = items.length - 1;
      }
      setHighlightedIndex(nextHighlightedIndex);
    }

    if (event.key === "ArrowDown") {
      if (highlightedIndex < items.length - 1) {
        nextHighlightedIndex = highlightedIndex + 1;
      } else {
        nextHighlightedIndex = 0;
      }

      setHighlightedIndex(nextHighlightedIndex);
      //handleItemFocus(nextHighlightedIndex);
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
    listRef,
    onListItemRefAdd,
  };
}
