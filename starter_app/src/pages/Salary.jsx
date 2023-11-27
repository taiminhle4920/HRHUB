import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import Jdenticon from '../components/Jdenticon';
import  LineGraph from '../components/LineGraph';
import { parseISO, add, differenceInMilliseconds, format } from 'date-fns';

function Salary() {
  const title = 'Salary history';

  const { getUserSalary } = useAuth();
  const [userSalary, setUserSalary] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchInfo = async () => {
    const data = await getUserSalary();
    data.sort((a, b) => new Date(a["from_date"]) - new Date(b["from_date"]))
    
    setUserSalary(data);
    let graphData = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        let entry1 = { x: data[key]["from_date"], y: data[key]['salary'] }
        let entry2 = { x: data[key]["to_date"], y: data[key]['salary'] }

        graphData.push(entry1)
        graphData.push(entry2)
      }
    }
    setChartData(graphData);
  };


  useEffect(() => {
    fetchInfo();
    console.log(chartData)
  }, []);

  function TableRow({ users }) {
        if (!users || !Array.isArray(users)) { // add a check to make sure users is an array
            return <></>;
        }

        return (
            <>
            {
              users.map((user, i) => (
                <tr key={i} className="align-middle">
                  <td>{i}</td>
                  <td>{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        }).format(user.salary)}</td>
                  <td>{user.from_date}</td>
                  <td>{user.to_date}</td>
                </tr>
              ))
            }
            </>
          );
    }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">salary</th>
              <th scope="col">from_date</th>
              <th scope="col">to_date</th>
            </tr>
            </thead>
            <tbody>
              <TableRow users={userSalary}/>
            </tbody>
          </table>
        </div>
        <LineGraph key={chartData} chartData={chartData}/>
      </div>
    </>
  );
}

export default Salary;
