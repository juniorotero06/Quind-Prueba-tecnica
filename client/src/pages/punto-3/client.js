import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import ClientForm from "../../components/forms/client/add";
import ClientEditForm from "../../components/forms/client/edit";
import RentCameraForm from "../../components/forms/client/rentCamera";
import Layout from "../../containers/layout/index";

import { getRequest, deleteRequest } from "../../utils/requests";

function ClientPage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalRent, setModalRent] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    await getRequest({ setFunction: setFormData, patch: "client" });
  };

  const deleteClient = async (clientId) => {
    await deleteRequest({ patch: "client", id: clientId });
  };

  const returnCamera = async (clientId, cameraId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/api/client/return/${clientId}/${cameraId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <Layout title="Clients">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <SearchHeader
          setModal={setModal}
          modal={modal}
          getFn={handleGetItems}
          titleButton="Add Clients"
        />
        <div>
          <h1>Clients</h1>
        </div>
        <TableDashboard
          items={formData}
          deleteFn={deleteClient}
          setItemSelected={setItemSelected}
          setModalEdit={setModalEdit}
          modalEdit={modalEdit}
          setModalRent={setModalRent}
          modalRent={modalRent}
          getFn={handleGetItems}
          returnCamera={returnCamera}
          optionsTableHeader={["Name", "rentedCamera", "penaltyMonths"]}
          optionsTableBody={["name", "rentedCamera", "penaltyMonths"]}
          deleteProperty="_id"
          isClient
        />
      </Paper>
      <Modal
        title="Add Client"
        setFn={setModal}
        toggleOverlay={toggleOverlay}
        visible={modal}
      >
        <ClientForm getFn={handleGetItems} />
      </Modal>
      <Modal
        title="Edit Client"
        setFn={setModalEdit}
        toggleOverlay={toggleOverlay}
        visible={modalEdit}
      >
        <ClientEditForm getFn={handleGetItems} client={itemSelected} />
      </Modal>
      <Modal
        title="Rentar Camara"
        setFn={setModalRent}
        toggleOverlay={toggleOverlay}
        visible={modalRent}
      >
        <RentCameraForm getFn={handleGetItems} client={itemSelected} />
      </Modal>
    </Layout>
  );
}

export default ClientPage;
