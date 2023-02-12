// import { MediaRenderer } from "@thirdweb-dev/react";
import MMarketplace from '../contractAbi/NFTMarketplace.json'
import getContract from "../helpers/getContract";
import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';
// import ProgressIndicator from '../components/common/ProgressIndicator';
import NftCard from '../components/marketplace/NftCard';
// import { MediaRenderer } from "@thirdweb-dev/react";


 

const Marketplace = () => {

  const [nfts,setNfts] = useState([]);
  // const [progress,setProgress] = useState(false);

  useEffect(()=>{
    getAllNFTs()
  },[])
  // getAllNFTs()
  
  async function getAllNFTs() {
   
    // setProgress(true)

    const contract = await getContract("0x8d84d36E3bd4eb10e98D63476BFbAeE2Af2019a2",MMarketplace.abi)
    console.log('contract ---------------------->',contract)
   
     //create an NFT Token
     let transaction = await contract.getAllNFTs()
     console.log('transaction ---------------------->',transaction)
   
     //Fetch all the details of every NFT from the contract and display
    //  const items = await Promise.all(transaction.map(async nftDetails => {
    //      const tokenURI = await contract.tokenURI(nftDetails.tokenId);
    //      console.log(tokenURI);
    //      let meta = await axios.get(tokenURI);
    //     // let meta = await fetch(tokenURI, {
    //     //   method: 'get',
    //     //   credentials: 'omit',
    //     // });
    //      meta = meta.data;
    //      console.log(meta)
   
    //      let price = ethers.utils.formatUnits(nftDetails.price.toString(), 'ether');
    //      let item = {
    //          price,
    //          tokenId: nftDetails.tokenId.toNumber(),
    //          seller: nftDetails.seller,
    //          owner: nftDetails.owner,
    //          image: meta.image,
    //          name: meta.nftName,
    //          description: meta.nftDescription,
    //      }
    //      return item;
    //  }))
    
    //  console.log('items',items)
    //  setProgress(false)
    getItems(transaction,contract)
    async function getItems(transaction, contract) {
      let items = [];
      for (const nftDetails of transaction) {
        const tokenURI = await contract.tokenURI(nftDetails.tokenId);
        console.log(tokenURI);
        // let meta = await axios.get(tokenURI,{
        //   headers:'text/plain'
        // });
        let meta = await axios.get(tokenURI
          ,{
          headers: {
            'Accept': 'text/plain'
          }
        })
        
        meta = meta.data;
        console.log(meta);
        let price = ethers.utils.formatUnits(nftDetails.price.toString(), 'ether');
        let item = {
          price,
          tokenId: nftDetails.tokenId.toNumber(),
          seller: nftDetails.seller,
          owner: nftDetails.owner,
          image: meta.image,
          name: meta.nftName,
          description: meta.nftDescription,
        };
        items.push(item);
      }
      setNfts(items);
    }
    
   }
  return (
  <>
    <Container
  </>
  )
}

export default Marketplace;


