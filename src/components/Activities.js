import { Typography, Box } from "@mui/material";
import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Activities = ({ data }) => {
  return (
    <Box
      sx={{ width: "1340px", height: "128px", display: "flex", gap: "22px" }}
    >
      {data.map((act,index) => (
        <Box key={index} sx={{ width: "323px", height: "128px", border: "3px solid #f3f3f3" , borderRadius: "6px", padding: "16px"}}>
        
        <Box  sx={{ width: "291px", height: "96px", display: "flex", gap: "20px" }}>
           <img src={act.icon} alt={act.name} style={{width: '32px', height: '32px'}}/>
           <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>
              <Typography sx={{width:"293px", height: "15px", fontWeight: 400, fontSize: "10px", lineHeight: "15px", color: "#484848"}}>
                  {act.name}
              </Typography>
              <Box sx={{display: "flex", gap: "7px", alignItems:"center"}}>
              <Typography sx={{width:"76px", height: "36px", fontWeight: 600, fontSize: "24px", lineHeight: "36px", color: "#191919"}}>
                  {act.Total} 
               </Typography>
               <Typography color={act.percentageChange > 0 < 20 ? "green" : "red"}>
                  {act.percentageChange > 0 ? (
                      <ArrowUpwardIcon sx={{fontSize: "10px"}} color="success" />
                    ) : (
                      <ArrowDownwardIcon sx={{fontSize: "10px"}} color="error" />
                    )} {Math.abs(act.percentageChange)}%
               </Typography>
              </Box>
               <Typography sx={{width:"293px", height: "15px", fontWeight: 300, fontSize: "15px", lineHeight: "15px", color: "#757575"}}>
                 {act.TotalSales}
               </Typography>
           </Box>
        </Box>
     
    </Box>
      ))}
      
    </Box>
  );
};

export default Activities;
