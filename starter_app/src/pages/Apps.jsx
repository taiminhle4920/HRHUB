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
    console.log("tset1")
    const data = await getStatistic();
    setChartData(data);
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
        { <PieGraph chartData={chartData}/> }
      </div>
    </>
  );
}

export default Apps;
