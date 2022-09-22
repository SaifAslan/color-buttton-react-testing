import "./App.css";
import { useState } from "react";

export function replaceCamelCaseWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [color, setcolor] = useState("MediumVioletRed");
  const [checkboxChecked, setcheckboxChecked] = useState(false);
  const newColor = color === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <input
        id="disable-button-checkbox"
        checked={checkboxChecked}
        onChange={(e) => setcheckboxChecked(e.target.checked)}
        type="checkbox"
      />
      <label htmlFor="disable-button-checkbox">disable button</label>

      <button
        onClick={() => setcolor(newColor)}
        style={{ backgroundColor: checkboxChecked ? "grey" : color }}
        disabled={checkboxChecked}
      >
        Change to {replaceCamelCaseWithSpaces(newColor)}
      </button>
    </div>
  );
}

export default App;
