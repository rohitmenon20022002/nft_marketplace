import { Box} from "@mui/material";
import { Field } from "formik";
import React from "react";

const ImageInput = (props) => {
  const { name, label, type, error, touched } = props;
  const hasError = error && touched;
  return (
    <>
      <Field
        as="input"
        name={name}
        label={label}
        type={type}
        error={hasError}
        onChange={(e) => {
            console.log("inside onchange ")
        }}
      />
      <Box height={14} />
    </>
  );
};

export default ImageInput;
