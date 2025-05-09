import { Box, Typography } from "@mui/material";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import dropdown from "../assets/chevron-down.png";
import calender from "../assets/calendar-days.png";

const TicketData = [
  { name: "Tickets Bought", value: 3400, color: "#830000" },
  { name: "Attendance", value: 281, color: "#F6D3D4" },
  { name: "Feed Back Received", value: 10, color: "#E37B7F" },
];

const getTotal = () => TicketData.reduce((acc, item) => acc + item.value, 0);

const PieMetrics = () => {
  const total = getTotal();
  const maxValue = Math.max(...TicketData.map((item) => item.value));

  // const CustomLegend = ({ payload }) => (
  //   <ul style={{ listStyleType: "none", padding: 0 }}>
  //     {payload.map((entry, index) => (
  //       <li
  //         key={`item-${index}`}
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           marginBottom: "5px",
  //         }}
  //       >
  //         <span
  //           style={{
  //             width: "12px",
  //             height: "12px",
  //             borderRadius: "50%",
  //             backgroundColor: entry.color,
  //             display: "inline-block",
  //             marginRight: "8px",
  //           }}
  //         ></span>
  //         {entry.value}
  //       </li>
  //     ))}
  //   </ul>
  // );

  return (
    <Box sx={{ width: "481px", height: "399px" }}>
      <Box
        sx={{ width: "481px", height: "67px", display: "flex", gap: "15px" }}
      >
        <Box sx={{ width: "333px", height: "67px" }}>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: "#A3A3A",
            }}
          >
            Ticket Activity
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "36px",
              color: "#191919",
            }}
          >
            6,920
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "3px",
          }}
        >
          <img src={calender} style={{ width: "16px", height: "16px" }} />
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
            Today
          </Typography>
          <img src={dropdown} style={{ width: "16px", height: "16px" }} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "422px",
          height: "400px",
          display: "flex",
          border: "2px solid #f3f3f3",
        }}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={TicketData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60} // Empty center space
            outerRadius={100} // Outer radius for the donut
          >
            {TicketData.map((entry, index) => {
              const isMax = entry.value === maxValue;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter: isMax
                      ? "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))"
                      : "none",
                  }}
                  outerRadius={isMax ? 110 : 100} // Increase size for max value
                />
              );
            })}
          </Pie>
          <Tooltip />
          <Legend
            content={({ payload }) => (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {payload.map((entry, index) => (
                  <li
                    key={`item-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: entry.color,
                        display: "inline-block",
                        marginRight: "8px",
                      }}
                    ></span>
                    {entry.value}
                  </li>
                ))}
              </ul>
            )}
          />
          {/* Centered Text */}
          <text
            x="50%" // Center horizontally
            y="37%" // Center vertically
            textAnchor="middle" // Align text in the middle
            dominantBaseline="middle" // Align text in the vertical middle
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {`Total: ${total}`}
          </text>
        </PieChart>
      </Box>
    </Box>
  );
};

export default PieMetrics;
