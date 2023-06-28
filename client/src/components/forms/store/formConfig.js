import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  repairServiceAddress: yup.string().required("This field is required"),
});

export const validationEditSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  repairServiceAddress: yup.string().required("This field is required"),
  availableCameras: yup
    .array()
    .of(yup.string().required("Camera ID is required"))
    .required("At least one camera is required"),
});
