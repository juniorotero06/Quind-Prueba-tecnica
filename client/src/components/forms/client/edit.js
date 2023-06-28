import React from "react";
import { useFormik } from "formik";
import { validationEditSchema } from "./formConfig";
import { TextField, Button } from "@mui/material";

import { patchRequest } from "../../../utils/requests";

const ClientEditForm = ({ getFn, client }) => {
  const formik = useFormik({
    initialValues: {
      name: client.name,
      penaltyMonths: client.penaltyMonths,
    },
    validationSchema: validationEditSchema,
    onSubmit: async (values) => {
      await patchRequest({
        getFn,
        values,
        patch: "client",
        id: client._id,
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
      <br />
      <TextField
        label="Penalty Months"
        name="penaltyMonths"
        value={formik.values.penaltyMonths}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.penaltyMonths && Boolean(formik.errors.penaltyMonths)
        }
        helperText={formik.touched.penaltyMonths && formik.errors.penaltyMonths}
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default ClientEditForm;
