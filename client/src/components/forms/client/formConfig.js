import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
});

export const validationEditSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  rentedCamera: yup.mixed().nullable().required("Rented camera is required"),
  penaltyMonths: yup.number().default(0),
});
