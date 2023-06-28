import React from "react";
import { useFormik } from "formik";
import { validationEditSchema } from "./formConfig";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const ClientEditForm = ({ getFn, client }) => {
  const [cameras, setCameras] = React.useState([]);

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

  const formik = useFormik({
    initialValues: {
      name: client.name,
      rentedCamera: client.rentedCamera,
      penaltyMonths: client.penaltyMonths,
    },
    validationSchema: validationEditSchema,
    onSubmit: async (values) => {
      await fetch("http://localhost:3001/v1/api/client/" + client._id, {
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

  React.useEffect(() => {
    getCameras();
  }, []);

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
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default ClientEditForm;
