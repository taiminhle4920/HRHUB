import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import Jdenticon from '../components/Jdenticon';


function Salary() {
  const title = 'Salary history';

  const { getUserSalary } = useAuth();
  const [userSalary, setUserSalary] = useState({});

  const fetchInfo = async () => {
    const data = await getUserSalary();
    setUserSalary(data);
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
              <button type="button" className="btn btn-sm btn-outline-secondary">Create
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary">Remove</button>
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
              <TableRow users={userSalary} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Salary;
