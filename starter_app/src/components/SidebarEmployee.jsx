import { NavLink } from 'react-router-dom';

import './sidebar.css';

function Sidebar() {
  const items = [
    { path: '/employee', title: 'Dashboard', icon: 'bi-house-door' },
    { path: '/employee/salary', title: 'Salary', icon: 'bi bi-cash' },
    { path: '/employee/titles', title: 'Titles', icon: 'bi bi-person-lines-fill' },
  ];

  return (
    <>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {
            items.map((item, i) => (
              <li key={i} className="nav-item">
                <NavLink className="nav-link" end to={item.path}>
                  <i className={`bi ${item.icon} pe-2`} />
                  {item.title}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
