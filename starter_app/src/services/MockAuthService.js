import axios from 'axios';


const keyUser = 'authx.user';


function setUser(user) {
  console.log(user);
  const currentUser = {
    email: user.email,
    role: user.role !== null ? user.role : null,
  };

  localStorage.setItem(keyUser, JSON.stringify(currentUser));
}


function getSession() {
  const user = localStorage.getItem(keyUser);
  return JSON.parse(user);
}

function getRole() {
  const user = JSON.parse(localStorage.getItem(keyUser));
  if (user!= null)
    return user.role;
  else
    return null;
}

async function getRoleFromEmployeeId(employeeId) {
  const res = await axios.post(`http://localhost:8080/api/auth/uploadEmployeeId`, {employeeId: employeeId}, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
  setUser(res.data.user)
  const user = JSON.parse(localStorage.getItem(keyUser));
  if (user!= null && user.role!=null)
    return user.role;
  else
    return null;
}

async function setGoogleUser() {
  const res = await axios.get("http://localhost:8080/api/auth/googleUser", {withCredentials: true}).catch((err) => {
    console.log("Not properly authenicated");
    return "";
  });
  setUser(res.data.user);
  return JSON.stringify(res.data.user);
}

function isAuth() {
  const res = getSession();
  return !!getSession();
}

async function login(username, password) {
  const res = await axios.post(`http://localhost:8080/api/login`, {email: username, password: password}, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
  //console.log(res);
  setUser(res.data.user);
  return res;
}


async function logout() {
  const res = await axios.get("http://localhost:8080/api/logout/google", { withCredentials: true}).catch((err) => {
    console.log("error logging out");
  });
  console.log(res)
  localStorage.removeItem(keyUser);
  return;
}

async function sendPasswordReset() {
  return new Promise((resolve) => {
    // Using setTimeout to simulate network latency.
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function getUserProfile() {
  const res = await axios.get(`http://localhost:8080/api/profile`, {withCredentials: true, headers: {'Content-Type': 'application/json'}}).catch((err) => {
    console.log("error getting user profile");
    return null;
  });
  if (res.data != null)
    return res.data;
  else
    return null;
}

async function changeUserProfile() {
  const res = await axios.get(`http://localhost:8080/api/profile`, {withCredentials: true, headers: {'Content-Type': 'application/json'}}).catch((err) => {
    console.log("error getting user profile");
    return null;
  });
  if (res.data != null)
    return res.data;
  else
    return null;
}

async function getUserPayroll() {
  const res = await axios.get(`http://localhost:8080/api/profile`, {withCredentials: true, headers: {'Content-Type': 'application/json'}}).catch((err) => {
    console.log("error getting user profile");
    return null;
  });
  if (res.data != null)
    return res.data;
  else
    return null;
}

// The useAuth hook is a wrapper to this service, make sure exported functions are also reflected
// in the useAuth hook.
export {
  getSession, isAuth, login, logout, sendPasswordReset, setGoogleUser, getRole, getRoleFromEmployeeId, getUserProfile
};
