import { Box, Typography, Stack } from '@mui/material'
import React, {useState} from 'react'
import Password from './Password';
import PersonalInfo from './PersonalInfo';
import Notifications from './Notifications';

const Settings = () => {

  const [currentTab, setCurrentTab] = useState(0);

  const pages = ["PersonalInfo", "Password", "Notifications"];

  const renderContent = () => {
    if (currentTab === 0) return <PersonalInfo />;
    if (currentTab === 1) return <Password />;
    if (currentTab === 2) return <Notifications />;
    return null;
  };

  return (
    <Stack
    zIndex={-1}
    sx={{
      width: "1340px",
      height: "1236px",
      ml: "50px",
      mt: "188px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      position: "absolute",
    }}
    
    >
       {/* Tab Headers */}
      <Box
        sx={{
          width: "245px",
          height: "34px",
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {pages.map((page, index) => (
          <Box
            key={index}
            onClick={() => setCurrentTab(index)} // Update tab on click
            sx={{
              border: currentTab === index ? "2px solid #000000" : "1px solid #f6f6f6",
              borderRadius: "6px",
              padding: "4px 6px",
              cursor: "pointer",
              backgroundColor: currentTab === index ? "#ffffff" : "transparent",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "18px",
                color: currentTab === index ? "#000000" : "#484848",
              }}
            >
              {page}
            </Typography>
          </Box>
        ))}
      </Box>
      
      {/* Tab Content */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        {renderContent()}
      </Box>
    </Stack>
  )
}

export default Settings
