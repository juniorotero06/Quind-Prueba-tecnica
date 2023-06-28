import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import FilmForm from "../../components/forms/film/add";
import FilmEditForm from "../../components/forms/film/edit";
import Layout from "../../containers/layout/index";

import { getRequest, deleteRequest } from "../../utils/requests";

function FilmPage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    await getRequest({ setFunction: setFormData, patch: "film" });
  };

  const deleteFilm = async (filmId) => {
    await deleteRequest({ patch: "film", id: filmId });
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
