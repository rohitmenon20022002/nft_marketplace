import { Button, Input } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import TextInput from "./common/TextInput";
import * as yup from "yup";
import { Box } from "@mui/system";
// import ImageInput from "./common/ImageInput";
//hh

import {uploadFileToIPFS,uploadJSONToIPFS} from "../../pinata"
import Marketplace from '../../contractAbi/NFTMarketplace.json'



const FormComponent = () => {
  const ethers = require("ethers");
  const [nftArt,setNftArt] = useState();
  
  const initialValues = {
    nftName: "",
    nftDescription: "",
    price: "",
    image:""
  };
  const formikProps = {
    initialValues: initialValues,
    onSubmit:async(values) => {
      console.log("the values are:", values);
      const {nftName,nftDescription,price} = values;
      const url = await uploadArt();
      await listNFT(nftName,nftDescription,price,url);
     
    },
    validationSchema: yup.object({
      nftName: yup.string().required("NftName is required"),
      nftDescription: yup
        .string()
        .required("Description for the NFT is required"),
      price: yup.number().required("Price is required"),
    }),
  };

  async function uploadArt(){
    console.log("inside uploadArt")
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(nftArt);
      if(response.success === true) {
          console.log("Uploaded image to Pinata: ", response.pinataURL)
          return response.pinataURL
      }
  }
  catch(e) {
      console.log("Error during file upload", e);
  }
  }
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    setNftArt(file);
    console.log(file)
    console.log("inside onchange file")
   
    // check for file extension
   
}

async function uploadMetadataToIPFS(nftName,nftDescription,price,url) {
  console.log("inside uploadMetadataToIPFS")

 
  //Make sure that none of the fields are empty
  if( !nftName || !nftDescription || !price || !url)
      return;

  const nftJSON = {
      nftName, nftDescription, price, image: url
  }

  try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if(response.success === true){
          console.log("Uploaded JSON to Pinata: ", response)
          return response.pinataURL;
      }
  }
  catch(e) {
      console.log("error uploading JSON metadata:", e)
  }
}

async function listNFT(nftName,nftDescription,price,url) {

  console.log("inside listNFT")

  //Upload data to IPFS
  try {
      const metadataURL = await uploadMetadataToIPFS(nftName,nftDescription,price,url);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(window.ethereum);
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      console.log('provider: ' + provider)
      const signer = provider.getSigner();
      console.log('the signer is:', signer)


      console.log("please wait..");


      let contract = new ethers.Contract("0x8C8aD13082e5fC5BFe45c32fFB0A81fbF594F0b5", Marketplace.abi, signer)
      console.log(contract)


      const nftPrice = ethers.utils.parseUnits(price, 'ether')

      let listingPrice = await contract.listPrice()
      console.log('the list price is:', listingPrice)
      listingPrice = listingPrice.toString()

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, nftPrice, { value: listingPrice })
      await transaction.wait()

      alert("Successfully listed your NFT!");
      // updateMessage("");
      // updateFormParams({ name: '', description: '', price: ''});
      // window.location.replace("/")
  }
  catch(e) {
      alert( "Upload error"+e )
  }
}
  return (
    <Box sx={{ width: "300px" }}>
      <Formik {...formikProps}>
        {({ errors, touched }) => {
          return (
            <Form>
              <TextInput
                name="nftName"
                label="Nft Name"
                type="name"
                error={errors.name}
                touched={touched.name}
              />

              <TextInput
                name="nftDescription"
                label="Nft Description"
                type="name"
                error={errors.name}
                touched={touched.name}
              />

              <TextInput
                name="price"
                label="Price"
                type="name"
                error={errors.name}
                touched={touched.name}
              />
             {/* <ImageInput
             type="file"
             name="image"
             label="Image"
             /> */}
              <Input type={"file"} onChange={OnChangeFile}></Input>
              <Button
            
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                List NFT
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default FormComponent;
