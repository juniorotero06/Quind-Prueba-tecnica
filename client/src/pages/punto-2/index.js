import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Layout from "../../containers/layout/index";

function Punto2() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/v1/api/punto-2/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout title="Punto 2">
      <>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ingrese una cadena de caracteres"
            value={message}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <hr></hr>
          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </form>

        {result && <div>{result}</div>}
      </>
    </Layout>
  );
}

export default Punto2;
