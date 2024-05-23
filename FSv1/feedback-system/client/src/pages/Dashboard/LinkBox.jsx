import React from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const LinkBox = ({ iconSrc, accName, url, bgColor, color }) => {
  return (
    <Box className="linkbox" sx={{ backgroundColor: bgColor, color: color }}>
      <img
        src={iconSrc}
        alt="App Icon"
        width="40"
        height="40"
        style={{ marginRight: "16px" }}
      />
      <Typography fontFamily="Roboto" variant="body1" sx={{ flexGrow: 1 }}>
        {accName}
      </Typography>
      <IconButton sx={{color: color}} onClick={() => window.open(url, "_blank")}>
        <OpenInNewIcon />
      </IconButton>
    </Box>
  )
}

export default LinkBox
