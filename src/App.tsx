import React from "react";
import "./App.css";
import Flavanoids from "./components/Flavonoids/Flavanoids";
import { wine_data } from "./data/wine-data";
import Gamma from "./components/Gamma/Gamma";

function App() {
  return (
    <div className="App">
      <Flavanoids data={wine_data} />
      <Gamma data={wine_data}/>
    </div>
  );
}

export default App;
