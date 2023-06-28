import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchHeader from "../../components/dashboard/search/index";
import TableDashboard from "../../components/dashboard/table/index";
import Modal from "../../components/modal/index";
import CameraForm from "../../components/forms/camera/add";
import CameraEditForm from "../../components/forms/camera/edit";
import Layout from "../../containers/layout/index";

function CameraPage() {
  const [formData, setFormData] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const toggleOverlay = (fn, status) => fn(!status);

  const handleGetItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/v1/api/camera/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      console.log(data);
      setFormData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteCamera = async (cameraId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/v1/api/camera/${cameraId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete camera");
      }

      console.log("camera deleted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <Layout title="Cameras">
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <SearchHeader
          setModal={setModal}
          modal={modal}
          getFn={handleGetItems}
          titleButton="Add Cameras"
        />
        <div>
          <h1>Cameras</h1>
        </div>
        <TableDashboard
          items={formData}
          deleteFn={deleteCamera}
          setItemSelected={setItemSelected}
          setModalEdit={setModalEdit}
          modalEdit={modalEdit}
          getFn={handleGetItems}
          optionsTableHeader={[
            "Brand",
            "Model",
            "hasFlash",
            "filmTypes",
            "Status",
            "returnDate",
          ]}
          optionsTableBody={[
            "brand",
            "model",
            "hasFlash",
            "filmTypes",
            "status",
            "returnDate",
          ]}
          deleteProperty="_id"
        />
      </Paper>
      <Modal
        title="Add Camera"
        setFn={setModal}
        toggleOverlay={toggleOverlay}
        visible={modal}
      >
        <CameraForm getFn={handleGetItems} />
      </Modal>
      <Modal
        title="Edit Camera"
        setFn={setModalEdit}
        toggleOverlay={toggleOverlay}
        visible={modalEdit}
      >
        <CameraEditForm getFn={handleGetItems} camera={itemSelected} />
      </Modal>
    </Layout>
  );
}

export default CameraPage;
