import React from "react";
import { useFormik } from "formik";
import { validationSchema } from "./formConfig";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { postRequest } from "../../../utils/requests";

const CameraForm = ({ getFn }) => {
  const formik = useFormik({
    initialValues: {
      brand: "",
      model: "",
      hasFlash: false,
      status: "available",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await postRequest({ getFn, values, patch: "camera" });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Brand"
        name="brand"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
      />
      <br />
      <TextField
        label="Model"
        name="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.model && Boolean(formik.errors.model)}
        helperText={formik.touched.model && formik.errors.model}
      />
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Has Flash</FormLabel>
        <RadioGroup
          name="hasFlash"
          value={formik.values.hasFlash.toString()}
          onChange={formik.handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          style={{ minWidth: "120px" }}
          inputProps={{ style: { minWidth: "120px" } }}
        >
          <MenuItem value="available">available</MenuItem>
          <MenuItem value="rented">rented</MenuItem>
          <MenuItem value="delayed">delayed</MenuItem>
          <MenuItem value="repair">repair</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default CameraForm;
