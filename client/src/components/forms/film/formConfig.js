import * as yup from "yup";

export const validationSchema = yup.object().shape({
  brand: yup
    .string("This field must be a string")
    .required("This field is required"),
  name: yup
    .string("This field must be a string")
    .required("This field is required"),
  iso: yup
    .number("This field must be a number")
    .oneOf([50, 100, 200, 400, 800, 1600], "Invalid ISO value")
    .required("This field is required"),
  format: yup
    .string("This field must be a string")
    .oneOf(["35mm", "110mm", "120mm"], "Invalid Format value")
    .required("This field is required"),
});

export const validationEditSchema = yup.object().shape({
  brand: yup
    .string("This field must be a string")
    .required("This field is required"),
  name: yup
    .string("This field must be a string")
    .required("This field is required"),
  iso: yup
    .number("This field must be a number")
    .oneOf([50, 100, 200, 400, 800, 1600], "Invalid ISO value")
    .required("This field is required"),
  format: yup
    .string("This field must be a string")
    .oneOf(["35mm", "110mm", "120mm"], "Invalid Format value")
    .required("This field is required"),
});
