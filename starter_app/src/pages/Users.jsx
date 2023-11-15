import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import "./Users.css";
import Jdenticon from '../components/Jdenticon';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
          {/* <td>{user.emp_no}</td> */}
          {/* make field emp_no click able and navigate to /console/profile */}
          <td><Link to={`/console/editprofile/${user.emp_no}`}>{user.emp_no}</Link></td>
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

  const fetchUsers = async (term) => {
    const url = term ? `http://localhost:8080/api/users?term=${term}` : 'http://localhost:8080/api/users';
    return await axios.get(url, { withCredentials: true }).then((res) => {setUsers(res.data);});
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setUsers([]);
    await fetchUsers(searchTerm);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">{title}</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
                <Link to="/console/addemployee"><button type="button" className="btn btn-sm btn-outline-secondary" >Create</button></Link>
 
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="row">
              <div class="col-12 col-md-8">
                <input type="text" className="form-control" placeholder="Employee name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div class="col-6 col-md-4">
                <button className="search-button" type="button" onClick={handleSearch}>Search</button>
                </div>
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
