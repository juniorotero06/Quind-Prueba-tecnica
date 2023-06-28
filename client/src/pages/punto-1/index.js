import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Layout from "../../containers/layout/index";

function Punto1() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Eliminar espacios en blanco
    setNumbers(sanitizedValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/v1/api/punto-1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ integerList: numbers.split(",") }),
      });

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout title="Punto 1">
      <>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ingrese una lista de enteros no negativos separados por comas"
            value={numbers}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <hr></hr>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </form>

        {result && <div>El número más grande posible es: {result}</div>}
      </>
    </Layout>
  );
}

export default Punto1;
