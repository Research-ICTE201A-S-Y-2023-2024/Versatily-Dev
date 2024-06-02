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
  TextField,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Lock, LockOpen, TextFields} from "@mui/icons-material";
import Editor from "./Editor";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
  "& .MuiInputBase-root": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    background: theme.palette.mode === "dark" ? "#333" : "#f4f4f4",
    border: theme.palette.mode === "dark" ? "1px solid #555" : "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      background: theme.palette.mode === "dark" ? "#444" : "#f0f0f0",
    },
    "&.Mui-focused": {
      background: theme.palette.mode === "dark" ? "#222" : "#fff",
      boxShadow: theme.palette.mode === "dark" ? "0 0 0 1px #42B81A" : "0 0 0 1px #1976D2",
    },
  },
}));


function TextEditor() {
  const systemSettingsPrefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState(systemSettingsPrefersDarkMode ? "dark" : "light");
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  const [layoutAnchorEl, setLayoutAnchorEl] = useState(null);
  const [viewport, setViewport] = useState("100%");
  const [submittedContent, setSubmittedContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [open, setOpen] = useState(false);
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
    setOpen(true); // Open the dialog to ask for the title and tag
  };

  const handleDialogClose = async (save) => {
    setOpen(false);
    if (save) {
      try {
        const response = await fetch("http://localhost:3001/save-content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content: submittedContent, tag: selectedTag }),
        });

        if (response.ok) {
          console.log("Content saved successfully");
        } else {
          console.error("Failed to save content");
        }
      } catch (error) {
        console.error("Error saving content:", error);
      }
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
              color="success"
              onClick={handleDialogClose}
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
        <Editor
          isEditable={isEditable}
          showMenuBar={showMenuBar}
          submittedContent={submittedContent}
          setSubmittedContent={setSubmittedContent}
          rteRef={rteRef}
          title={title}
          setTitle={setTitle}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </Box>
    </ThemeProvider>
  );
}

export default TextEditor;
