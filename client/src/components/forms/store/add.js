import React from "react";
import { useFormik } from "formik";
import { validationSchema } from "./formConfig";
import { TextField, Button } from "@mui/material";

const StoreForm = ({ getFn }) => {
  // useFormik para manejar el estado del formulario y las validaciones
  const formik = useFormik({
    initialValues: {
      name: "",
      repairServiceAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await fetch("http://localhost:3001/v1/api/store/", {
        method: "POST",
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
        label="repairServiceAddress"
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
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default StoreForm;
