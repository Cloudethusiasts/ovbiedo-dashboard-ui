import React from 'react'
import { Box, Typography } from '@mui/material'

const PersonalInfo = () => {
  return (
    <Box sx={{
      width: "1207px",
      height: "413px",
      display: "flex",
      flexDirection: "row",
      gap: "30px",
      //justifyItems: "center"
    }}>
      <Box sx={{
        width: "300px",
        height: "44px"
      }}>
        <Typography sx={{
          width: "300px",
          height: "20px",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#474747"
        }}>
            Personal Info
        </Typography>
        <Typography  sx={{
          width: "300px",
          height: "20px",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#474747"
        }}>
          Update your photo and personal details:
        </Typography>
      </Box>
      <Box sx={{
        width: "875px",
        height: "413px"
      }}>

      </Box>
    </Box>
  )
}

export default PersonalInfo
