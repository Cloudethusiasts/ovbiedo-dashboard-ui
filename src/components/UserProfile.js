import React from "react";
import Avatar from "../assets/Rectangle.png";
import dropdown from "../assets/chevron-down.png"
import { Box, Typography } from "@mui/material";
import calender from "../assets/calendar-days.png"

const UserProfile = () => {
  return (
    <Box
      zIndex= {-1}
      sx={{
        width: "1340px",
        height: "48px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Box sx={{ display: "flex", border: "2px solid #f3f3f3", padding: "14px 10px", height: "70px" }}>
        <img src={Avatar} />
        <Box>
          <Typography sx={{width:"195px", height: "24px", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#191919"}}>Hello Florence 🤗</Typography>
          <Typography sx={{width:"195px", height: "18px", fontWeight: 300, fontSize: "12px", lineHeight: "18px", color: "#484848"}}>Hope you are having a good day?.</Typography>
        </Box>
      </Box>
      <Box sx={{display: "flex", gap:"3px", border: "2px solid #f3f3f3", padding: "8px" }}>
        <img src={calender} style={{width: '16px', height: '16px'}}/> 
        <Typography sx={{width:"56px", height: "18px", fontWeight: 400, fontSize: "12px", lineHeight: "18px", color: "#484848"}}>
          Today
        </Typography>
        <img src={dropdown} style={{width: '16px', height: '16px'}}/>
      </Box>
    </Box>
  );
};

export default UserProfile;
