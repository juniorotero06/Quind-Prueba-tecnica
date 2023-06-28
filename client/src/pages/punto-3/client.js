import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import ClientForm from "../../components/forms/client/add";
import ClientEditForm from "../../components/forms/client/edit";
import Layout from "../../containers/layout/index";

function ClientPage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/api/client/", {
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

  const deleteClient = async (clientId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/api/client/${clientId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete client");
      }

      console.log("client deleted successfully");
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
          getFn={handleGetItems}
          optionsTableHeader={["Name", "rentedCamera", "penaltyMonths"]}
          optionsTableBody={["name", "rentedCamera", "penaltyMonths"]}
          deleteProperty="_id"
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
    </Layout>
  );
}

export default ClientPage;
