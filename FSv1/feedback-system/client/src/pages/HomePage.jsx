import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Drawer from "@mui/material/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "@fontsource/poppins";
import "@fontsource/roboto"

import TimeBox from "./Dashboard/TimeBox";
import LinkBox from "./Dashboard/LinkBox";
import "./pages_stylesheet.css";
import { light } from "@mui/material/styles/createPalette";


const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontStyleItalic: "italic",
  },
  palette: {
    primary: {
      main: "#00a86b",
    },
    secondary: {
      main: "#98fb98",
    },
  },
})

function HomePageToolbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  const handleListItemClick = (text) => {
    switch (text) {
      case "Homepage":
        navigate("/home")
        break
      case "Forms":
        navigate("/")
        break
      case "About":
        navigate("/")
        break
      default:
        break
    }
    setOpen(false)
  }

  const Sidebar = (
    <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <img
          src="android-chrome-512x512.png"
          alt="App Logo"
          style={{ width: "30%", height: "auto" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ pl: 2, py: 3, fontWeight: 600 }}
        >
          Versatily - ArciFS
        </Typography>
      </Box>
      <Divider />
      <List>
        {["Homepage", "Forms", "About"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : null}
                {index === 1 ? <InsertDriveFileIcon /> : null}
                {index === 2 ? <InfoIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {Sidebar}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight="light">
            Versatily - ArciFS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

function HomePage() {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:5173/dashboard_conf.json`)
      .then((response) => {
        setConfig(response.data)
      })
      .catch((error) => {
        console.error("Error fetching configuration:", error)
      })
  }, [])

  useEffect(() => {
    document.title = "ArciFS - Home"
  }, [])

  if (!config) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <HomePageToolbar />
      <div className="hp-maincontainer">
        <Box className="hp-componentcontainer-1">
          <TimeBox />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Connections:{" "}
          </Typography>
          <LinkBox
            iconSrc="msforms.svg"
            accName={config.msforms.accname}
            url={config.msforms.url}
            bgColor={config.msforms.bgcolor}
            color={config.msforms.color}
          />
          <LinkBox
            iconSrc="powerautomate.svg"
            accName={config.powerautomate.accname}
            url={config.powerautomate.url}
            bgColor={config.powerautomate.bgcolor}
            color={config.powerautomate.color}
          />
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default HomePage
