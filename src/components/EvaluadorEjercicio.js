import React, { useState, useEffect } from "react";

const EvaluadorEjercicio = ({ exercise }) => {
  let [currentExercise, setCurrentExercise] = useState(exercise);

  useEffect(() => {
    setCurrentExercise(exercise);
  }, [exercise]);

  const handleOperationSelection = (operation) => {
    const operators = ["+", "-", "*", "/"];

    if (!operators.includes(operation)) {
      alert("No hay esa operación");
      return;
    }

    const regex = new RegExp(`([-+]?\\d+)\\s*\\${operation}\\s*([-+]?\\d+)`);
    let match = currentExercise.match(regex);

    console.log("?????: ", match);

    if (match) {
      const leftOperand = parseInt(match[1], 10);
      const rightOperand = parseInt(match[2], 10);

      // Verificar jerarquía de operaciones
      if (currentExercise.includes("(")) {
        // Encontrar la operación dentro del paréntesis
        const parenthesisRegex = /\(([^)]+)\)/;
        const parenthesisMatch = currentExercise.match(parenthesisRegex);
        console.log("PARENTESIS", parenthesisMatch);
        if (parenthesisMatch) {
          if (
            (operation === "+" || operation === "-") &&
            (parenthesisMatch.includes("*") || parenthesisMatch.includes("/"))
          ) {
            alert("Debes seguir la jerarquía de las operaciones");
            return;
          } else if (operation === "/" && parenthesisMatch.includes("*")) {
            alert("Debes seguir la jerarquía de las operaciones");
            return;
          } else if (operation === "+" && parenthesisMatch.includes("-")) {
            alert("Debes seguir la jerarquía de las operaciones");
            return;
          }
        }
      } else if (
        (operation === "+" || operation === "-") &&
        (currentExercise.includes("*") || currentExercise.includes("/"))
      ) {
        alert("Debes seguir la jerarquía de las operaciones");
        return;
      } else if (operation === "/" && currentExercise.includes("*")) {
        alert("Debes seguir la jerarquía de las operaciones");
        return;
      } else if (operation === "+" && currentExercise.includes("-")) {
        alert("Debes seguir la jerarquía de las operaciones");
        return;
      }

      let result;
      switch (operation) {
        case "+":
          // Ajustar el resultado considerando el valor de la operación a la izquierda
          if (match[0].includes("+")) {
            console.log("SUMAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log("Ejercicio", currentExercise);
            console.log("numero izquierda: ", leftOperand);
            console.log("numero derecha: ", rightOperand);
            result = leftOperand + rightOperand;
            console.log("Resultado: ", result);
          } else {
            console.log("SUMAAAAAAAAAAAAAAAAAAAAAAAAA");
            console.log("numero izquierda: ", leftOperand);
            console.log("numero derecha: ", rightOperand);
            result = leftOperand + rightOperand;
            console.log("Resultado: ", result);
          }
          break;
        case "-":
          // Ajustar el resultado considerando el valor de la operación a la izquierda
          console.log("RESTAAAAAAAAAAAAAAAAAAAAAAA");
          console.log("numero izquierda: ", leftOperand);
          console.log("numero derecha: ", rightOperand);
          result = leftOperand - rightOperand;
          console.log("Resultado: ", result);
          break;
        case "*":
          console.log("MULTIIIIIIIIIIIIIIIIIIIIIIIII");
          console.log("numero izquierda: ", leftOperand);
          console.log("numero derecha: ", rightOperand);
          result = leftOperand * rightOperand;
          console.log("Resultado: ", result);
          break;
        case "/":
          console.log("DIVIIIIIIIIIIIIIIIIIIIIIII");
          result = leftOperand / rightOperand;
          break;
        default:
          break;
      }

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
      console.log("Nuevo ejercicio: ", newExercise);
    } else {
      alert("No se encontró la operación en el formato correcto");
    }
  };

  return (
    <div>
      <p>{currentExercise}</p>
      <button onClick={() => handleOperationSelection("+")}>Suma</button>
      <button onClick={() => handleOperationSelection("-")}>Resta</button>
      <button onClick={() => handleOperationSelection("*")}>
        Multiplicación
      </button>
      <button onClick={() => handleOperationSelection("/")}>División</button>
      {/* Otros botones de operaciones según sea necesario */}
    </div>
  );
};

export default EvaluadorEjercicio;
