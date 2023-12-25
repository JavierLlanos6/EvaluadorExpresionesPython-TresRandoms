import React from "react";
import "../css/evaluadorejercicio.css";
const CargarArchivo = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileUpload(file);
  };

  return (
    <div className="cargararchivo">
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <p className="interrogacion">?</p>
      <p className="texto">
        El formato de archivo debe ser .txt y en este formato: 4+5-6 con
        distintos simbolos + - * /
      </p>
    </div>
  );
};

export default CargarArchivo;
