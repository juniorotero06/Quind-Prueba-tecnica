import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import FilmForm from "../../components/forms/film/add";
import FilmEditForm from "../../components/forms/film/edit";
import Layout from "../../containers/layout/index";

function FilmPage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/api/film/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteFilm = async (filmId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/api/film/${filmId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete film");
      }

      console.log("Film deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <Layout title="Films">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <SearchHeader
          setModal={setModal}
          modal={modal}
          getFn={handleGetItems}
          titleButton="Add Films"
        />
        <div>
          <h1>Films</h1>
        </div>
        <TableDashboard
          items={formData}
          deleteFn={deleteFilm}
          setItemSelected={setItemSelected}
          setModalEdit={setModalEdit}
          modalEdit={modalEdit}
          getFn={handleGetItems}
          optionsTableHeader={["Brand", "Name", "ISO", "Format"]}
          optionsTableBody={["brand", "name", "iso", "format"]}
          deleteProperty="_id"
        />
      </Paper>
      <Modal
        title="Add Films"
        setFn={setModal}
        toggleOverlay={toggleOverlay}
        visible={modal}
      >
        <FilmForm getFn={handleGetItems} />
      </Modal>
      <Modal
        title="Edit Films"
        setFn={setModalEdit}
        toggleOverlay={toggleOverlay}
        visible={modalEdit}
      >
        <FilmEditForm getFn={handleGetItems} film={itemSelected} />
      </Modal>
    </Layout>
  );
}

export default FilmPage;
