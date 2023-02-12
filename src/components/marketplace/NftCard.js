import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { MediaRenderer } from "@thirdweb-dev/react";


export default function NftCard({price,artUrl,artTitle,artDescription}) {
  return (
    <Card variant="outlined" sx={{ width: 220 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {artTitle}
      </Typography>
      {/* <Typography level="body2">April 24 to May 02, 2021</Typography>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
    
      </IconButton> */}
      {/* <AspectRatio > */}
      <MediaRenderer
    src="https://gateway.pinata.cloud/ipfs/QmX7twSYtrsffMJkigGmnFjSzSSnvnqpeRzgftiug9ngJp"
    alt="A mp4 video"
    width='200px'
    height='200px'
  />
      {/* </AspectRatio> */}
   
      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">ETH price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {price}
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Buy
        </Button>
      </Box>
     
    </Card>
  );
}