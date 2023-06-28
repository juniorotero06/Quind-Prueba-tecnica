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
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import { getRequest, patchRequest } from "../../../utils/requests";

const CameraEditForm = ({ getFn, camera }) => {
  const [films, setFilms] = React.useState([]);

  const getFilms = async () => {
    await getRequest({ setFunction: setFilms, patch: "film" });
  };

  const formik = useFormik({
    initialValues: {
      brand: camera.brand,
      model: camera.model,
      hasFlash: camera.hasFlash,
      filmTypes: camera.filmTypes,
      status: camera.status,
      returnDate: camera.returnDate,
    },
    validationSchema: validationEditSchema,
    onSubmit: async (values) => {
      await patchRequest({ getFn, values, patch: "camera", id: camera._id });
    },
  });

  const handleFilmTypesChange = (event) => {
    formik.setFieldValue("filmTypes", event.target.value);
  };

  React.useEffect(() => {
    getFilms();
  }, []);

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
      <FormControl style={{ width: "50%" }}>
        {/* <InputLabel id="returnDate-label">Return Date</InputLabel> */}
        <TextField
          // label="Return Date"
          name="returnDate"
          type="date"
          value={formik.values.returnDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.returnDate && Boolean(formik.errors.returnDate)}
          helperText={formik.touched.returnDate && formik.errors.returnDate}
        />
      </FormControl>

      <br />
      <FormControl style={{ width: "50%" }}>
        <InputLabel id="filmTypes-label">Film Types</InputLabel>
        <Select
          label="filmTypes"
          name="filmTypes"
          multiple
          value={formik.values.filmTypes}
          onChange={handleFilmTypesChange}
          onBlur={formik.handleBlur}
          error={formik.touched.filmTypes && Boolean(formik.errors.filmTypes)}
          helperText={formik.touched.filmTypes && formik.errors.filmTypes}
        >
          {films.map((film) => (
            <MenuItem key={film._id} value={film._id}>
              {`${film.brand} / ${film.name}`}
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

export default CameraEditForm;
