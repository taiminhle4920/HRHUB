import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';


function Salary() {
  const title = 'Title history';

  const { getUserTitles } = useAuth();
  const [userTitles, setUserTitles] = useState({});
  const fetchInfo = async () => {
    const data = await getUserTitles();
    setUserTitles(data);
  };
  useEffect(() => {
    fetchInfo();
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
                  <td>{user.title}</td>
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
              <th scope="col">title</th>
              <th scope="col">from_date</th>
              <th scope="col">to_date</th>
            </tr>
            </thead>
            <tbody>
              <TableRow users={userTitles}/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Salary;
