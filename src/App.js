import React, { useState } from "react";
import "./App.css";
import CargarArchivo from "./components/CargarArchivo";
import EvaluadorEjercicio from "./components/EvaluadorEjercicio";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [exercise, setExercise] = useState("");

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
      setExercise(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <div className="inicio">
        <h1>Evaluador de expresiones Matemáticas</h1>
      </div>
      <div className="archivo">
        <CargarArchivo onFileUpload={handleFileUpload} />
      </div>
      <EvaluadorEjercicio exercise={exercise} />
    </div>
  );
}

export default App;
