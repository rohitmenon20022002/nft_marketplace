import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/material';

const ProgressIndicator = () => {
  return (
    
    <Container sx={{display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        marginTop:"150px"}}>
      <CircularProgress />
    </Container>
    
  )
}

export default ProgressIndicator