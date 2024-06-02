import React, { useCallback, useMemo, useState, useRef } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Stack,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Lock, LockOpen, TextFields, PhoneIphone, Laptop, DesktopWindows } from "@mui/icons-material";
import Editor from "./Editor";

function TextEditor() {
  const systemSettingsPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState(systemSettingsPrefersDarkMode ? "dark" : "light");
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [layoutAnchorEl, setLayoutAnchorEl] = useState(null);
  const [viewport, setViewport] = useState("100%");
  const [submittedContent, setSubmittedContent] = useState("");
  const rteRef = useRef(null);

  const togglePaletteMode = useCallback(() => setPaletteMode(prevMode => (prevMode === "light" ? "dark" : "light")), []);
  const theme = useMemo(() => createTheme({
    palette: {
      mode: paletteMode,
      secondary: { main: "#42B81A" },
    },
  }), [paletteMode]);

  const handleLayoutMenuClick = (event) => {
    setLayoutAnchorEl(event.currentTarget);
  };

  const handleLayoutMenuClose = (viewport) => {
    setLayoutAnchorEl(null);
    if (viewport) {
      setViewport(viewport);
    }
  };
  
  const handleSave = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";
    setSubmittedContent(content);
  
    try {
      const response = await fetch("http://localhost:3001/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
  
      if (response.ok) {
        console.log("Content saved successfully");
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setShowMenuBar(currentState => !currentState)}
              startIcon={<TextFields />}
            >
              {showMenuBar ? "Hide Formatting" : "Show Formatting"}
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => setIsEditable(currentState => !currentState)}
              startIcon={isEditable ? <Lock /> : <LockOpen />}
            >
              {isEditable ? "Read-Only" : "Editable"}
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleLayoutMenuClick}
              startIcon={<DesktopWindows />}
            >
              Layout View
            </Button>
            <Menu
              anchorEl={layoutAnchorEl}
              open={Boolean(layoutAnchorEl)}
              onClose={() => handleLayoutMenuClose(null)}
            >
              <MenuItem onClick={() => handleLayoutMenuClose("360x800")}><PhoneIphone /> Phone (360x800)</MenuItem>
              <MenuItem onClick={() => handleLayoutMenuClose("1024x858")}><Laptop /> Laptop (1024x858)</MenuItem>
              <MenuItem onClick={() => handleLayoutMenuClose("1920x1080")}><DesktopWindows /> Desktop (1920x1080)</MenuItem>
            </Menu>
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Stack>
          <IconButton onClick={togglePaletteMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto", width: viewport }}>
        <Editor isEditable={isEditable} showMenuBar={showMenuBar} submittedContent={submittedContent} setSubmittedContent={setSubmittedContent} rteRef={rteRef} />
      </Box>
    </ThemeProvider>
  );
}

export default TextEditor;
