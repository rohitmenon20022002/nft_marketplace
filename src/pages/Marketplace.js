// import { MediaRenderer } from "@thirdweb-dev/react";
import MMarketplace from '../contractAbi/NFTMarketplace.json'
import getContract from "../helpers/getContract";
import axios from 'axios';
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';
import ProgressIndicator from '../components/common/ProgressIndicator';
import NftCard from '../components/marketplace/NftCard';
import { MediaRenderer } from "@thirdweb-dev/react";


 

const Marketplace = () => {

  const [nfts,setNfts] = useState([]);
  const [progress,setProgress] = useState(false);

  useEffect(()=>{
    getAllNFTs()
  },[])
  // getAllNFTs()
  
  async function getAllNFTs() {
   
    setProgress(true)

    const contract = await getContract("0x8C8aD13082e5fC5BFe45c32fFB0A81fbF594F0b5",MMarketplace.abi)
    console.log('contract ---------------------->',contract)
   
     //create an NFT Token
     let transaction = await contract.getAllNFTs()
    //  console.log('transaction ---------------------->',transaction)
   
     //Fetch all the details of every NFT from the contract and display
     const items = await Promise.all(transaction.map(async nftDetails => {
         const tokenURI = await contract.tokenURI(nftDetails.tokenId);
         console.log(tokenURI);
         let meta = await axios.get(tokenURI);
        // let meta = await fetch(tokenURI, {
        //   method: 'get',
        //   credentials: 'omit',
        // });
         meta = meta.data;
         console.log(meta)
   
         let price = ethers.utils.formatUnits(nftDetails.price.toString(), 'ether');
         let item = {
             price,
             tokenId: nftDetails.tokenId.toNumber(),
             seller: nftDetails.seller,
             owner: nftDetails.owner,
             image: meta.image,
             name: meta.nftName,
             description: meta.nftDescription,
         }
         return item;
     }))
     setNfts(items)
     console.log('items',items)
     setProgress(false)
   }
  return (
  <>
    <div>
     {/* <ProgressIndicator/> */}
     <NftCard/>
     <MediaRenderer
    src="https://gateway.pinata.cloud/ipfs/QmQNpWdSUzWfw4GriGNGKYUdnt9QLyuRS5AxgNSy4BtNyu"
    alt="A mp4 video"
  />
     
    </div>
  </>
  )
}

export default Marketplace;


