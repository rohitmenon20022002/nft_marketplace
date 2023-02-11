import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
// const desiredChainId = ChainId.Goerli;

root.render(
  
 
 
    <BrowserRouter>
    <ThirdwebProvider>
    <App />
    </ThirdwebProvider>
    </BrowserRouter>

);


