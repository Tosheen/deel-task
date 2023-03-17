import type { Fetcher } from "./interface";
import DogBreeds from "../data/dog-breeds.json";

export const dogBreedsFetcher: Fetcher = (searchKey: string) => {
  const matchedBreeds = DogBreeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchKey.toLowerCase())
  ).map((breed) => breed.name);

  return Promise.resolve(matchedBreeds);
};
