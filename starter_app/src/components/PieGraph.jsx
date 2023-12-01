import React  from 'react';
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function PieGraph({ chartData }) {
  //console.log(chartData)
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Overview</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Department Overview"
            }
          }
        }}
      />
    </div>
  );
}

export default PieGraph;