import React, { useState } from "react";
import ChartComponent from "./start/ChartComponent";
import Add from "./start/Add";
// import PercentageList from "./start/PercentageList";

function App() {
  const [data, setData] = useState([{ time: "2024-05-01", value: 1.2 }]);
  const [lastDate, setLastDate] = useState(new Date(2024, 4, 1)); // Mes 4 es mayo
  const [lastValue, setLastValue] = useState(1.2); // Inicializa con el valor inicial

  const handleNewPercentage = (percentage) => {
    const numericValue = parseFloat(percentage);
    if (!isNaN(numericValue)) {
      // Aumentar el día para la nueva entrada
      const newDate = new Date(lastDate);
      newDate.setDate(newDate.getDate() + 1);
      setLastDate(newDate);

      // Formatear la nueva fecha como "yyyy-mm-dd"
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Calcular el nuevo valor basado en la tendencia limitada
      let newValue;
      if (numericValue >= 2) {
        newValue = lastValue + 2; // Incrementa en 2 si el valor es mayor o igual a 2
      } else {
        newValue = lastValue - 1; // Decrementa en 1 si el valor es menor a 2
      }
      setLastValue(newValue);

      const newDataPoint = {
        time: formattedDate,
        value: newValue,
      };

      // Actualizar los datos ordenadamente
      const updatedData = [...data, newDataPoint];
      setData(updatedData);
    } else {
      console.error("El valor ingresado no es un número válido");
    }
  };

  return (
    <div className="app">
      <div className="app__central">
        <ChartComponent data={data} />
      </div>
      <div className="add">
        <Add handleNewPercentage={handleNewPercentage} />
      </div>
      {/* <div>
        <PercentageList />
      </div> */}
    </div>
  );
}

export default App;
