import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { EventContext } from "../context/EventsContext";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const UpcomingEvent = () => {
  const { events } = useContext(EventContext) || { events: [] };
  return (
    <>
       <Box
        sx={{
          width: "1340px",
          height: "1208px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
         {events.map((event, index) => {
           const date = new Date(event.eventStartDate); // Parse the eventEndDate
           const day = date.getDate(); // Extract day
           const month = date.toLocaleString("default", { month: "short" });
          return (
            <Box key={index} sx={{ border: "2px solid #f6f6f6" }}>
            <Box
              sx={{
                width: "1340px",
                height: "378px",
                display: "flex",
                flexDirection: "row",
                gap: "24px",
                padding: "40px",
              }}
            >
              <Box
                sx={{
                  width: "43px",
                  height: "116px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {}
                <Typography
                  sx={{
                    width: "43px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                >
                  {month}
                </Typography>
                <Typography
                  sx={{
                    width: "43px",
                    height: "54px",
                    lineHeight: "54px",
                    fontSize: "36px",
                    fontWeight: 600,
                  }}
                >
                  {day}
                </Typography>
              </Box>
              <Box sx={{ width: "455px", height: "278px" }}>
                <img src={event.imageUrl} alt={event.eventName}/>
              </Box>
              <Box
                sx={{
                  width: "770px",
                  height: "278px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <Typography
                  sx={{
                    width: "770px",
                    height: "36px",
                    lineHeight: "36px",
                    fontSize: "24px",
                    fontWeight: 500,
                    color: "#191919",
                  }}
                >
                  {event.eventName}
                </Typography>
                <Typography
                  sx={{
                    width: "770px",
                    height: "28px",
                    lineHeight: "28px",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#757575",
                  }}
                >
                  {event.eventStartDate}
                </Typography>
                <Typography
                  sx={{
                    width: "770px",
                    height: "28px",
                    lineHeight: "28px",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#757575",
                  }}
                >
                  {event.eventLocation}
                </Typography>
                <Typography
                  sx={{
                    width: "770px",
                    height: "84px",
                    lineHeight: "28px",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#191919",
                  }}
                >
                  {event.eventDescription}
                </Typography>

                <Link
                  id="RouterNavLink"
                  to={event.id ? `${event.id}` : <></>}
                >
                  <Typography
                    sx={{
                      width: "227px",
                      height: "21px",
                      lineHeight: "21px",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "#830000",
                    }}
                  >
                    View event details <ArrowForwardOutlinedIcon sx={{fontSize: "11px"}} />
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          )
        })}
      </Box>
      <Box></Box>
    </>
  )
}

export default UpcomingEvent
