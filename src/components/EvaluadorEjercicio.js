import React, { useState, useEffect } from "react";
import "../css/evaluadorejercicio.css";

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

    clearAlert(); // Limpiar el mensaje de alerta antes de realizar la operación

    if (match) {
      const leftOperand = parseInt(match[1], 10);
      const rightOperand = parseInt(match[2], 10);

      // Verificar jerarquía de operaciones
      if (currentExercise.includes("(")) {
        // Encontrar la operación dentro del paréntesis
        const parenthesisRegex = /\(([^)]+)\)/;
        const parenthesisMatch = currentExercise.match(parenthesisRegex);
        if (parenthesisMatch) {
          if (
            (operation === "+" || operation === "-") &&
            (parenthesisMatch.includes("*") || parenthesisMatch.includes("/"))
          ) {
            showAlert("Debes seguir la jerarquía de las operaciones");
            return;
          } else if (operation === "/" && parenthesisMatch.includes("*")) {
            showAlert("Debes seguir la jerarquía de las operaciones");
            return;
          } else if (operation === "+" && parenthesisMatch.includes("-")) {
            showAlert("Debes seguir la jerarquía de las operaciones");
            return;
          }
        }
      } else if (
        (operation === "+" || operation === "-") &&
        (currentExercise.includes("*") || currentExercise.includes("/"))
      ) {
        showAlert("Debes seguir la jerarquía de las operaciones");
        return;
      } else if (operation === "/" && currentExercise.includes("*")) {
        showAlert("Debes seguir la jerarquía de las operaciones");
        return;
      } else if (operation === "+" && currentExercise.includes("-")) {
        showAlert("Debes seguir la jerarquía de las operaciones");
        return;
      }

      let result;
      switch (operation) {
        case "+":
          // Ajustar el resultado considerando el valor de la operación a la izquierda
          if (match[0].includes("+")) {
            result = leftOperand + rightOperand;
          } else {
            result = leftOperand + rightOperand;
          }
          break;
        case "-":
          // Ajustar el resultado considerando el valor de la operación a la izquierda
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

      // Reemplazar las operaciones de suma y resta a la izquierda de la operación seleccionada
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
    } else {
      showAlert("No se encontró la operación en el formato correcto");
    }
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
            <li className="lista" key={index}>
              {exercise}
            </li>
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
      <footer>
        <p>By TresRandoms</p>
      </footer>
    </div>
  );
};

export default EvaluadorEjercicio;
