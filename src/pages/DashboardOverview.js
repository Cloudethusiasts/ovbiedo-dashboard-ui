import React, { useContext, useState } from "react";
//import { EventContext } from "../contexts/EventsContext";
import { Box, Stack, Typography } from "@mui/material";
import UserProfile from "../components/UserProfile";
import events from "../assets/events.png";
import tickets from "../assets/ticket.png";
import attendees from "../assets/user-group.png";
import registerattendees from "../assets/presentation-chart-line.png";
import Activities from "../components/Activities";
import MetricsCharts from "../components/MetricsCharts";
import SearchBar from "../components/SearchBar";
import dropdown from "../assets/chevron-down.png";
import EventsTable from "../components/EventsTable";

const data = [
  {
    icon: tickets,
    name: "Total Ticket Sales",
    percentageChange: 75,
    Total: "N150K",
    TotalSales: "N106,000 last week",
  },
  {
    icon: events,
    name: "Total Events",
    percentageChange: 95,
    Total: "32",
    TotalSales: "41 last week",
  },
  {
    icon: attendees,
    name: "Total Attendees",
    percentageChange: 5,
    Total: "602",
    TotalSales: "620 last week",
  },
  {
    icon: registerattendees,
    name: "Total Attendees Registered",
    percentageChange: 11,
    Total: "6920",
    TotalSales: "7200 last week",
  },
];

const DashboardOverview = () => {
  //const { events } = useContext(EventContext) || { events: [] };
  const [selectedEvent, setSelectedEvent] = useState("")

  return (
    <Stack
      zIndex={-1}
      sx={{
        width: "1440px",
        height: "auto",
        ml: "50px",
        mt: "188px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        position: "absolute",
      }}
    >
      <Box>
        <UserProfile />
      </Box>

      <Box>
        <Activities data={data} />
      </Box>

      <Box>
        <MetricsCharts />
      </Box>

      <Box sx={{ marginTop: "30px" }}>
        <Box
          sx={{
            width: "1340px",
            height: "38px",
            padding: "20px 24px",
            border: "2px solid #f3f3f3",
          }}
        >
          <Typography>Events</Typography>
        </Box>
        <Box
          sx={{
            width: "1340px",
            height: "86px",
            padding: "20px 24px",
            border: "2px solid #f3f3f3",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "317px",
              height: "32px",
            }}
          >
            <SearchBar />
          </Box>
          <Box sx={{display: "flex", gap: "10px"}}>
            <Box sx={{ display: "flex", width: "110px", height: "29px", border: "1.5px solid #f3f3f3", justifyContent: "space-between", padding: "8px 12px"}}>
              <Typography
                sx={{
                  width: "56px",
                  height: "18px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#484848",
                }}
              >
                Type
              </Typography>
              <img src={dropdown} style={{ width: "16px", height: "16px" }} />
            </Box>
            <Box sx={{display: "flex", width: "110px", height: "29px", border: "1.5px solid #f3f3f3",justifyContent: "space-between" ,padding: "8px 10px"}}>
              <Typography
                sx={{
                  width: "56px",
                  height: "18px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#484848",
                }}
              >
                Location
              </Typography>
              <img src={dropdown} style={{ width: "16px", height: "16px" }} />
            </Box>
            <Box sx={{display: "flex", width: "110px", height: "29px", border: "1.5px solid #f3f3f3",justifyContent: "space-between" ,  padding: "8px 10px"}}>
              <Typography
                sx={{
                  width: "56px",
                  height: "18px",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#484848",
                }}
              >
                Status
              </Typography>
              <img src={dropdown} style={{ width: "16px", height: "16px" }} />
            </Box>
          </Box>
        </Box>
        <Box>
          <EventsTable event={selectedEvent}/>
        </Box>
      </Box>
    </Stack>
  );
};

export default DashboardOverview;
