import React, { useEffect }  from 'react';
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function LineGraph({ chartData }) {
  const data = {
    datasets: [{
          label: "Salary",
          data: chartData,
          borderColor: 'rgba(116, 236, 255, 0.8)',
          backgroundColor: 'rgba(200, 248, 255, 0.8)',
    }],
    }
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Salary Chart</h2>
      <Line
        data = {data}
        options={{
            scales: {
            }
        }}
      />
    </div>
  );
}

export default LineGraph;