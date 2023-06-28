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

import { getRequest, patchRequest } from "../../../utils/requests";

const StoreEditForm = ({ getFn, store }) => {
  const [cameras, setCameras] = useState([]);

  const getCameras = async () => {
    await getRequest({ setFunction: setCameras, patch: "camera" });
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
      await patchRequest({ getFn, values, patch: "store", id: store._id });
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
