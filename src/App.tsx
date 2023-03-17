import "./App.css";

import { DogsAutocomplete } from "./components/dogs-autocomplete";

function App() {
  return (
    <div>
      <h1>Dog Breeds Autocomplete (try typing `Maltese` or `Pinscher`)</h1>
      <DogsAutocomplete />
    </div>
  );
}

export default App;
