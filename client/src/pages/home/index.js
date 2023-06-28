import React from "react";
import Layout from "../../containers/layout/index";

function Home() {
  return (
    <Layout title="Home">
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <h1>Prueba Tecnica Quind</h1>
        <p>
          <strong>Desarrollador: </strong>Edgar Junior Otero Rada
        </p>
        <img
          src="https://quind.io/wp-content/uploads/2022/01/Logo-Quind-web-01.png"
          alt="preview"
          width="40%"
        />
      </div>
    </Layout>
  );
}

export default Home;
