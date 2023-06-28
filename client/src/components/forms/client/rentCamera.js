import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { validationRentCameraSchema } from "./formConfig";
import {
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { getRequest } from "../../../utils/requests";

const RentCameraForm = ({ getFn, client }) => {
  const [cameras, setCameras] = useState([]);

  const getCameras = async () => {
    await getRequest({ setFunction: setCameras, patch: "camera" });
  };

  useEffect(() => {
    getCameras();
  }, []);

  const formik = useFormik({
    initialValues: {
      rentedCamera: client.rentedCamera,
    },
    validationSchema: validationRentCameraSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `http://localhost:3001/v1/api/client/rent/${client._id}/${values.rentedCamera}`,
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="rentedCamera">Rented Camera</InputLabel>
        <Select
          label="Rented Camera"
          name="rentedCamera"
          value={formik.values.rentedCamera}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.rentedCamera && Boolean(formik.errors.rentedCamera)
          }
          helperText={formik.touched.rentedCamera && formik.errors.rentedCamera}
        >
          {cameras?.map((camera) => (
            <>
              <MenuItem
                key={camera._id}
                value={camera._id}
              >{`${camera.brand} / ${camera.model}`}</MenuItem>
              ;
            </>
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

export default RentCameraForm;
