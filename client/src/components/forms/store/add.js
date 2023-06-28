import React from "react";
import { useFormik } from "formik";
import { validationSchema } from "./formConfig";
import { TextField, Button } from "@mui/material";

import { postRequest } from "../../../utils/requests";

const StoreForm = ({ getFn }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      repairServiceAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await postRequest({ getFn, values, patch: "store" });
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
