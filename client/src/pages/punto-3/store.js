import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import StoreForm from "../../components/forms/store/add";
import StoreEditForm from "../../components/forms/store/edit";
import Layout from "../../containers/layout/index";

import { getRequest, deleteRequest } from "../../utils/requests";

function StorePage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    await getRequest({ setFunction: setFormData, patch: "store" });
  };

  const deleteStore = async (storeId) => {
    await deleteRequest({ patch: "store", id: storeId });
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <Layout title="Stores">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <SearchHeader
          setModal={setModal}
          modal={modal}
          getFn={handleGetItems}
          titleButton="Add Store"
        />
        <div>
          <h1>Stores</h1>
        </div>
        <TableDashboard
          items={formData}
          deleteFn={deleteStore}
          setItemSelected={setItemSelected}
          setModalEdit={setModalEdit}
          modalEdit={modalEdit}
          getFn={handleGetItems}
          optionsTableHeader={[
            "Name",
            "repairServiceAddress",
            "availableCameras",
          ]}
          optionsTableBody={[
            "name",
            "repairServiceAddress",
            "availableCameras",
          ]}
          deleteProperty="_id"
        />
      </Paper>
      <Modal
        title="Add Store"
        setFn={setModal}
        toggleOverlay={toggleOverlay}
        visible={modal}
      >
        <StoreForm getFn={handleGetItems} />
      </Modal>
      <Modal
        title="Edit Store"
        setFn={setModalEdit}
        toggleOverlay={toggleOverlay}
        visible={modalEdit}
      >
        <StoreEditForm getFn={handleGetItems} store={itemSelected} />
      </Modal>
    </Layout>
  );
}

export default StorePage;
