import * as yup from "yup";

export const validationSchema = yup.object().shape({
  brand: yup.string().required("This field is required"),
  model: yup.string().required("This field is required"),
  hasFlash: yup.boolean().required("This field is required"),
  status: yup
    .string()
    .oneOf(["available", "rented", "delayed", "repair"])
    .default("available"),
});

export const validationEditSchema = yup.object().shape({
  brand: yup.string().required("This field is required"),
  model: yup.string().required("This field is required"),
  hasFlash: yup.boolean().required("This field is required"),
  filmTypes: yup
    .array()
    .of(yup.mixed().required("Film ID is required"))
    .required("At least one film type is required"),
  status: yup
    .string()
    .oneOf(["available", "rented", "delayed", "repair"])
    .default("available"),
  returnDate: yup.date(),
});
