import React from "react";
import { useFormik } from "formik";
import { validationEditSchema } from "./formConfig";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const FilmEditForm = ({ getFn, film }) => {
  const formik = useFormik({
    initialValues: {
      brand: film.brand,
      name: film.name,
      iso: film.iso,
      format: film.format,
    },
    validationSchema: validationEditSchema,
    onSubmit: (values) => {
      // Envío de datos al backend
      fetch("http://localhost:3001/v1/api/film/" + film._id, {
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
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="iso-label">ISO</InputLabel>
        <Select
          labelId="iso-label"
          name="iso"
          value={formik.values.iso}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.iso && Boolean(formik.errors.iso)}
          helperText={formik.touched.iso && formik.errors.iso}
          style={{ minWidth: "120px" }}
          inputProps={{ style: { minWidth: "120px" } }}
        >
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
          <MenuItem value={400}>400</MenuItem>
          <MenuItem value={800}>800</MenuItem>
          <MenuItem value={1600}>1600</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="format-label">Format</InputLabel>
        <Select
          labelId="format-label"
          name="format"
          value={formik.values.format}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.format && Boolean(formik.errors.format)}
          helperText={formik.touched.format && formik.errors.format}
          style={{ minWidth: "120px" }}
          inputProps={{ style: { minWidth: "120px" } }}
        >
          <MenuItem value="35mm">35mm</MenuItem>
          <MenuItem value="110mm">110mm</MenuItem>
          <MenuItem value="120mm">120mm</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default FilmEditForm;
