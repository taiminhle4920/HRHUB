import { Helmet } from 'react-helmet';
import  PieGraph  from "../components/PieGraph";
import React, { useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';


function Apps() {
  const title = 'Applications';
  const { getStatistic } = useAuth();
  const [chartData, setChartData] = useState({
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
});

  const fetchInfo = async () => {
    const data = await getStatistic();
    console.log(data)
    let graphData = []
    let graphLabel = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        graphLabel.push(key)
        graphData.push(data[key])
      }
    }
    setChartData({
    datasets: [{
        data: graphData,
        backgroundColor: ["#ffa3a3", "#ffc5a3", "#fff6a3", "#e2ffa3", "#b3ffa3", "#a3ffce", "#a3fffa", "#a3d6ff", "#a3a9ff", "#cba3ff"]
    }],
    labels: graphLabel,
  });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
        </div>
        <div class="w-100 p-3">
        { <PieGraph chartData={chartData}/> }
        </div>
      </div>
    </>
  );
}

export default Apps;
