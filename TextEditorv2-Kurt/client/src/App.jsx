// Importing icons for brightness control from Material UI
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Importing various components and hooks from Material UI
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";

// Importing React hooks and custom editor component
import { useCallback, useMemo, useState } from "react";
import Editor from "./Editor";

// Main application component
function App() {
  // Checking if the user prefers dark mode based on system settings
  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  // State to manage the current palette mode (dark or light)
  const [paletteMode, setPaletteMode] = useState(
    systemSettingsPrefersDarkMode ? "dark" : "light"
  );

  // Function to toggle between dark and light mode
  const togglePaletteMode = useCallback(
    () =>
      setPaletteMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    []
  );

  // Memoizing the theme object to avoid unnecessary recalculations
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode, // Set the theme mode to the current palette mode
          secondary: {
            main: "#42B81A", // Define the secondary color
          },
        },
      }),
    [paletteMode] // Recalculate theme only when paletteMode changes
  );

  return (
    // Applying the theme to the entire application
    <ThemeProvider theme={theme}>
      {/* Applying baseline CSS styles to ensure consistent rendering */}
      <CssBaseline />

      {/* Application bar at the top */}
      <AppBar position="static">
        <Toolbar>
          {/* Application title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Content Management System
          </Typography>

          {/* Button to toggle between dark and light mode */}
          <IconButton onClick={togglePaletteMode} color="inherit">
            {/* Icon changes based on the current theme mode */}
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main content area with padding and centered alignment */}
      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto" }}>
        {/* Custom editor component */}
        <Editor />
      </Box>
    </ThemeProvider>
  );
}

// Exporting the App component as the default export
export default App;
