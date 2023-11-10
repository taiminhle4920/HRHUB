import {
  BrowserRouter, Navigate, NavLink ,Routes, Route,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import ConsoleLayout from '../layouts/ConsoleLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import LoginSuccess from '../pages/LoginSuccess';
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';
import Employeeid from '../pages/employeeid';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Apps from '../pages/Apps';
import Salary from '../pages/Salary';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import AuthProvider from '../hooks/AuthProvider';
import EmployeeLayout from '../layouts/EmployeeLayout';
import Sidebar from '../components/Sidebar';
import EditEmployeeProfile from '../pages/EditEmployeeProfile';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="login/success" element={<LoginSuccess/>} />
            <Route path="login/error" element={<About />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="employeeid" element={<Employeeid/>}/>
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>

          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apps" element={<Apps />} />
            <Route path="salary" element={<Salary />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/console" component={Sidebar} element={<ConsoleLayout />} >  
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="apps" element={<Apps />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="editprofile/:id" element={<EditEmployeeProfile />} />
            </Route>

          <Route path="profile" element={<Profile />} /> 
          <Route path='users' element={<Users />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
