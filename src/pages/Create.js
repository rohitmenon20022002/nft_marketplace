import { Box } from "@mui/system";
import React from "react";
import ImageComponent from "../components/create/ImageComponent";
import FormComponent from "../components/create/FormComponent";
import { Container } from "@mui/material";
const Create = () => {
  return (
    <>
    <Container>
      <Box sx={{ background:"",display: "flex",justifyContent:"space-around", height:"100%", marginTop:"70px"}}>
        <ImageComponent />
        <FormComponent />
      </Box>
    </Container>
    </>
  );
};

export default Create;
