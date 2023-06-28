import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validationEditSchema } from "./formConfig";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const StoreEditForm = ({ getFn, store }) => {
  const [cameras, setCameras] = useState([]);

  const getCameras = async () => {
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
      setCameras(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCameras();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: store.name,
      repairServiceAddress: store.repairServiceAddress,
      availableCameras: store.availableCameras,
    },
    validationSchema: validationEditSchema,
    onSubmit: async (values) => {
      await fetch("http://localhost:3001/v1/api/store/" + store._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          getFn();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  const handleAvailableCamerasChange = (event) => {
    formik.setFieldValue("availableCameras", event.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <br />
      <TextField
        label="Repair Service Address"
        name="repairServiceAddress"
        value={formik.values.repairServiceAddress}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.repairServiceAddress &&
          Boolean(formik.errors.repairServiceAddress)
        }
        helperText={
          formik.touched.repairServiceAddress &&
          formik.errors.repairServiceAddress
        }
      />
      <br />
      <FormControl style={{ width: "50%" }}>
        <Select
          label="Available Cameras"
          name="availableCameras"
          multiple
          value={formik.values.availableCameras}
          onChange={handleAvailableCamerasChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.availableCameras &&
            Boolean(formik.errors.availableCameras)
          }
          helperText={
            formik.touched.availableCameras && formik.errors.availableCameras
          }
        >
          {cameras.map((camera) => (
            <MenuItem key={camera._id} value={camera._id}>
              {`${camera.brand} / ${camera.model}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default StoreEditForm;
