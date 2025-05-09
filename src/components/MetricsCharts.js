import { Box } from '@mui/material'
import React from 'react'
import Metrics from './Metrics'
import PieMetrics from './PieMetrics'

const MetricsCharts = () => {
  return (
    <Box sx={{width: "1340px", height: "491px", display: "flex", justifyContent: "space-between", marginTop: "30px"}}>
        <Box sx={{width: "811px", height: "491px", border: "2px solid #f3f3f3", padding: "20px 32px", borderRadius: "2px"}}>
          <Metrics/>
        </Box>
        <Box sx={{width: "513px", height: "491px", border: "2px solid #f3f3f3", padding: "20px 32px"}}>
          <PieMetrics/>
        </Box>
    </Box>
  )
}

export default MetricsCharts
