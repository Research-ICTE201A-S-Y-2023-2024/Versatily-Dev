import React, { useState, useEffect } from "react"
import "../pages_stylesheet.css"
import { HexColorPicker } from "react-colorful"
import Box from "@mui/material/Box"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography"

function TimeBox() {
  const [color, setColor] = useState("#286cab")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [anchorEl, setAnchorEl] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const handleContextMenu = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditColor = () => {
    setShowColorPicker(true);
    handleClose();
  };

  const formattedTime = currentTime.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <>
      <Box
        onContextMenu={handleContextMenu}
        className="time-box"
        sx={{ backgroundColor: color }}
      >
        <Typography variant="body1">Current System Time:</Typography>
        <Typography variant="h6">{formattedTime}</Typography>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={handleEditColor}>Edit Color</MenuItem>
        </Menu>

        {showColorPicker && (
        <Box sx={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <HexColorPicker color={color} onChange={setColor} />
          <Box sx={{ textAlign: 'center', marginTop: 1 }}>
            <button onClick={() => setShowColorPicker(false)}>Close</button>
          </Box>
        </Box>
      )}
      </Box>
    </>
  )
}

export default TimeBox
