// import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Link,Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Create from "./pages/Create";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";

function App() {
  return (
    
    <>

    {/* <Navbar/> */}
    <nav>
      <Navbar/>
    </nav>
    <Routes>
    {/* <nav>
      <ul>
        <li>
          <Link to="/">ListNFT</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/test1">Test1</Link>
        </li>
      </ul>
    </nav> */}
    <Route path="/" element = {<Home/>}/>
    <Route path="/Marketplace" element={<Marketplace/>}/>
    <Route path="/Create" element={<Create/>} />
    <Route path="/Profile" element={<Profile/>} />
  </Routes>
    </>
  );
}

export default App;
