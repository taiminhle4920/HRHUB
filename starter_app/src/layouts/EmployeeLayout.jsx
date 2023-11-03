import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import ConsoleNavbar from '../components/ConsoleNavbar';
import SidebarEmployee from '../components/SidebarEmployee';
import useAuth from '../hooks/useAuth';
import Cookies from 'js-cookie';
function EmployeeLayout() {
  const auth = useAuth();
  const { pathname } = useLocation();
  // const role = Cookies.get('role');
  // const employeeId = Cookies.get('employeeId');
  // const expires = Cookies.get('expires');
  
  const role = auth.getRole();
  if (role !== null && role === 'employee'){
    return (
      <>
        <ConsoleNavbar />
        <div className="container-fluid">
          <div className="row">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
              <SidebarEmployee />
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <Outlet />
              <Footer />
            </main>
          </div>
        </div>
      </>
    );
  }

  return <Navigate to={`/login?redirect=${encodeURIComponent(pathname)}`} replace />;
}

export default EmployeeLayout;
