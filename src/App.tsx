import { useState } from "react";

import "./App.css";

import { DogsAutocomplete } from "./components/dogs-autocomplete";

function App() {
  return (
    <div>
      <h1>Autocomplete Example</h1>
      <DogsAutocomplete />
    </div>
  );
}

export default App;
