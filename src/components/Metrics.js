"use client";

import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import { Stack, Box, Typography } from "@mui/material";

const monthlyMetrics = [
  {
    month: "Jun",
    ticketsales: 150,
    color: "F6D3D4"
  },
  {
    month: "Jul",
    ticketsales: 20,
    color: "F6D3D4"
  },
  {
    month: "Aug",
    ticketsales: 50,
    color: "F6D3D4"
  },

  {
    month: "Sep",
    ticketsales: 70,
    color: "F6D3D4"
  },
  {
    month: "Oct",
    ticketsales: 90,
    color: "F6D3D4"
  },
  {
    month: "Nov",
    ticketsales: 110,
    color: "F6D3D4"
  },
  {
    month: "Dec",
    ticketsales: 200,
    color: "F6D3D4"
  },
];

const Metrics = () => {
  return (
    <Box
      sx={{
        width: "771px",
        height: "416px",
        backgroundColor: "#ffffff",
        diplay: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Box
        sx={{
          width: "771px",
          height: "67px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: "10px",
            lineHeight: "15px",
            color: "#A3A3A",
          }}
          gutterBottom
        >
          Total Ticket Sales
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
            color: "#191919",
          }}
          gutterBottom
        >
          N150k
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={771} height={348} zIndex={-1} data={monthlyMetrics}>
        <YAxis />
        <XAxis dataKey="month" />
        <Legend />
        <Tooltip content={<CustomTooltip/>}/>
        <CartesianGrid strokeDasharray="5 5" />
        <Area type="monotone" dataKey="ticketsales" stroke="#830000" fill="color"></Area>
      </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          width: "59px",
          height: "42px",
          backgroundColor: "#830000",
          color: "#ffffff",
          borderRadius: "8px",
          padding: "4px",
          textAlign: "center"
        }}
      >
        <Typography>
           {label}
        </Typography>
        <Typography>
          {payload[0].value}
        </Typography>
      </Box>
    );
  }
};

export default Metrics;
