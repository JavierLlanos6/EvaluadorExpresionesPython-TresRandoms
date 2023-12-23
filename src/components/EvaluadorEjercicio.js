import React, { useState, useEffect } from "react";
import '../css/evaluadorejercicio.css';

const EvaluadorEjercicio = ({ exercise }) => {
  const [currentExercise, setCurrentExercise] = useState(exercise);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    setCurrentExercise(exercise);
  }, [exercise]);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const clearAlert = () => {
    setAlertMessage(null);
  };

  const handleOperationSelection = (operation) => {
    const operators = ["+", "-", "*", "/"];

    if (!operators.includes(operation)) {
      showAlert("No hay esa operación");
      return;
    }

    const regex = new RegExp(`([-+]?\\d+)\\s*\\${operation}\\s*([-+]?\\d+)`);
    let match = currentExercise.match(regex);

    if (!match) {
      showAlert("No se encontró la operación en el formato correcto");
      return;
    }

    clearAlert(); // Limpiar el mensaje de alerta antes de realizar la operación

    const leftOperand = parseInt(match[1], 10);
    const rightOperand = parseInt(match[2], 10);

    let result;
    switch (operation) {
      case "+":
        result = leftOperand + rightOperand;
        break;
      case "-":
        result = leftOperand - rightOperand;
        break;
      case "*":
        result = leftOperand * rightOperand;
        break;
      case "/":
        result = leftOperand / rightOperand;
        break;
      default:
        break;
    }

    // Guardar el ejercicio actual en el historial
    setExerciseHistory([...exerciseHistory, currentExercise]);

    // Actualizar el ejercicio actual
    let newExercise = currentExercise.replace(
      regex,
      result >= 0 ? `${result}` : `${result}`
    );

    // Verificar si la expresión contiene paréntesis
    if (newExercise.includes("(")) {
      // Encontrar el primer paréntesis que contenga el resultado de la operación
      const parenthesisRegex = new RegExp(`\\(${result}\\)`);
      const parenthesisMatch = newExercise.match(parenthesisRegex);

      if (parenthesisMatch) {
        // Eliminar los paréntesis
        newExercise = newExercise.replace(parenthesisRegex, result);
      }
    }

    // Reemplazar doble signo negativo por signo positivo (globalmente)
    newExercise = newExercise.replace("- -", "+ ");
    setCurrentExercise(newExercise);
    console.log("Nuevo ejercicio: ", newExercise);
  };

  // Función para retroceder al ejercicio anterior
  const goBack = () => {
    if (exerciseHistory.length > 0) {
      const previousExercise = exerciseHistory.pop();
      setExerciseHistory([...exerciseHistory]);
      setCurrentExercise(previousExercise);
    }
  };

  return (
    <div>
      <div>
        <p className="ejercicio">{currentExercise}</p>
        {alertMessage && <p className="alerta">{alertMessage}</p>}
      </div>
      <div>
        <h2 className="pasos">Pasos Anteriores:</h2>
        <ul>
          {exerciseHistory.map((exercise, index) => (
            <li className="lista" key={index}>{exercise}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleOperationSelection("+")}>Suma</button>
      <button onClick={() => handleOperationSelection("-")}>Resta</button>
      <button onClick={() => handleOperationSelection("*")}>
        Multiplicación
      </button>
      <button onClick={() => handleOperationSelection("/")}>División</button>
      <button onClick={goBack}>Retroceder</button>
      {/* Otros botones de operaciones según sea necesario */}
      <footer><p>By Tres Randoms</p></footer>
    </div>
    
  );
};

export default EvaluadorEjercicio;
