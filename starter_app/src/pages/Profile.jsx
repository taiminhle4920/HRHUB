import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import Jdenticon from '../components/Jdenticon';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Profile() {
  const title = 'Profile';

  const token = Cookies.get('token'); // Replace with the actual name of your token cookie
  const employeeId = Cookies.get('employeeId'); // Replace with the actual name of your employeeId cookie
  const role = Cookies.get('role'); // Replace with the actual name of your role cookie

  const config = {
    headers: {
      'token': `${token}`,
      'employeeId': employeeId,
      'role': role,
    },
  };
  const [user, setUserData] = useState({});
  const fetchInfo = async () => {
    return await axios.get('http://localhost:8080/profile', config, { withCredentials: true }).then((res) => setUserData(res.data));
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container my-3">
        <div
          className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary fs-5">@{user.employeeId}</strong>
            <h3 className="mb-0">{user.firstName} {user.lastName}</h3>
            <p className="card-text mb-auto text-muted">Employee ID: {user.employeeId}</p>
            <p className="card-text mb-auto text-muted">Email: {user.email}</p>
            <p className="card-text mb-auto text-muted">Date Of Birth: {user.birth_date}</p>
            <div className="d-grid d-md-block mt-4">
              <button className="btn btn-outline-secondary btn-sm">Edit</button>
            </div>
          </div>
          <div className="col-auto d-none d-lg-block">
            <div className="pt-3 pe-3">
              <Jdenticon name={user.username} height="96px" width="96px" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
