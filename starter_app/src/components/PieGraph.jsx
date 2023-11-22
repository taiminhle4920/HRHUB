import React  from 'react';
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

function PieGraph({ chartData }) {
  //console.log(chartData)
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}

export default PieGraph;