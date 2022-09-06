import React from "react";
import { useState } from "react";

function App() {
  const [getInput, setGetInput] = useState("");
  const [fetchData, setFetchData] = useState([{}]);
  let apiKey = "5c1ae07c928049b535e767087cde269aa";
  function apiKeyChangeWhenSurpassedQouta() {
    if (fetchData.cod === 401) {
      apiKey = "5c1ae07c928049b535e767087cde269a";
    }
  }
  apiKeyChangeWhenSurpassedQouta();

  const handleData = (e) => {
    if (e.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${getInput}&unit=metic&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFetchData(data);
          console.log(data);
        });
      setGetInput("");
    }
  };
  return (
    <div>
      {" "}
      <input
        placeholder="Enter the city..."
        onChange={(e) => setGetInput(e.target.value)}
        value={getInput}
        onKeyPress={handleData}
      />
      {typeof fetchData.main == "undefined" ? (
        <div>
          <p>Welcome to weather app</p>
        </div>
      ) : (
        <div>
          <p>{fetchData.name}</p>
          <p>{fetchData.main.temp}</p>
          <p>{fetchData.main.humidity}</p>
        </div>
      )}
      {fetchData.cod == 404 ? (
        <div>
          {" "}
          <p>City not found</p>{" "}
        </div>
      ) : (
        <></>
      )}
      {fetchData.cod == 401 ? (
        <div>
          {" "}
          <p>Enter the city again!</p>{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
