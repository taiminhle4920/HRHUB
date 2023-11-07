import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Jdenticon from '../components/Jdenticon';
import axios from 'axios';

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
          <td>{user.emp_no}</td>
          <td>{user.first_name} {user.last_name}</td>
          <td>{user.department}</td>
          <td>{user.hire_date}</td>

          <td><Jdenticon name={user.username} height="32px" width="32px" /></td>
        </tr>
      ))
    }
    </>
  );
}

function Users() {
  const title = 'Users';

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (searchTerm) => {
    const url = searchTerm ? `http://localhost:8080/api/users?term=${searchTerm}` : 'http://localhost:8080/api/users';
    return await axios.get(url, { withCredentials: true }).then((res) => setUsers(res.data));
  };

  
  // const fetchInfo = async () => {
  //   return await axios.get('http://localhost:8080/api/users', { withCredentials: true }).then((res) => setUsers(res.data));
  // };
  // useEffect(() => {
  //   fetchInfo();
  // }, []);
  
  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };

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
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Hire Date</th>
            </tr>
            </thead>
            <tbody>
              <TableRow users={users} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
