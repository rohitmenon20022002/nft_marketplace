import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { CssBaseline } from "@mui/material";
import { Routes, Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Marketplace from "../contractAbi/NFTMarketplace.json";
// import SnackBar from "./common/SnackBar";
import { ConnectWallet } from "@thirdweb-dev/react";
import {
  useAddress,
  useMetamask,
  useLogin,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import { connect } from "formik";
const {ethers} = require("ethers");

const pages = ["Marketplace", "Create"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {

  
  const connect = useMetamask();
  const address = useAddress();
  const {user} = useUser();
  console.log(user)

  //COMPONENT LOGIC
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/* <CssBaseline /> */}
      <AppBar position="static">
        <Container maxWidth="xl" sx={{background:"linear-gradient(to right, #051937, #004d7a, #008793, #00bf72, #a8eb12)"}}>
          <Toolbar >
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "roboto",
                fontWeight: 900,
                letterSpacing: ".3rem",
                color: "#a8eb12",
                textDecoration: "none",
              }}
            >
              W3
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(`/${page}`);
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                  // <Link to="/Home">{page}</Link>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ETHPLACE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(`/${page}`);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="View Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,margin:"10px"}}>
                  <Avatar
                  
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    onClick={() => {
                      navigate("/Profile");
                    }}
                  />
                </IconButton>
              </Tooltip>
              {/* <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}

              {/* <Button
                variant="contained"
                color=  {address ? "success" : "warning"}
                sx={{ margin: 1, textTransform: "none" }}
              onClick = {connect}
              >
               {address ? "Connected" : "Connect"}
              </Button> */}
             
            </Box>
            <ConnectWallet accentColor="" colorMode="light" auth={{
    loginOptional: true,
  }}/>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <SnackBar /> */}
    </>
  );
}
export default Navbar;
