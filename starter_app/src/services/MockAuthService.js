import axios from 'axios';


const keyUser = 'authx.user';
const registeredUsers = new Map([
  ['admin', {
    id: 'uid:0', username: 'admin', email: 'admin@example.com', password: 'qwerty', firstname: 'App', lastname: 'Admin',
  }],
  ['lee', {
    id: 'uid:973236115', username: 'lee', email: 'lee@acme.com', password: '12345', firstname: 'Steve', lastname: 'Lee',
  }],
]);

function newUID() {
  const epoch = Math.floor(new Date() / 1000).toString();
  return `uid:${epoch}`;
}

function newToken() {
  return (Math.random() * 1000000000).toString(16);
}

function setSession(user, token) {
  const currentUser = {
    email: user.email,
    role: user.role !== null ? user.role : null,
    id: user.employeeId !== null ? user.employeeId : null,
  };

  localStorage.setItem(keyUser, JSON.stringify(currentUser));
}


function getSession() {
  const user = localStorage.getItem(keyUser);
  return JSON.parse(user);
}

function getRole() {
  const user = localStorage.getItem(keyUser);
  return JSON.parse(user.role);
}

async function getAuth() {
  const res = await axios.get("http://localhost:8080/api/auth/user", {withCredentials: true}).catch((err) => {
    console.log("Not properly authenicated");
    return "";
  });
  const token = newToken();
  setSession(res.data, token);
  return JSON.stringify(res.data);
}

function isAuth() {
  const res = getSession();
  return !!getSession();
}

async function login(username, password) {
  const res = await axios.post(`http://localhost:8080/api/login`, {email: username, password: password}, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
  setSession(res.data, token);
  return res;
}


async function logout() {
  // return new Promise((resolve) => {
  //   // Using setTimeout to simulate network latency.
  //   setTimeout(() => {
  //     localStorage.removeItem(keyUser);
  //     resolve();
  //   }, 1000);
  // });

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

async function addUser(user) {
  return new Promise((resolve) => {
    // Using setTimeout to simulate network latency.
    const id = newUID();
    setTimeout(() => {
      const merged = {
        ...user,
        id,
      };

      registeredUsers.set(user.username, merged);
      resolve(merged);
    }, 1000);
  });
}

async function getUsers() {
  return new Promise((resolve) => {
    // Using setTimeout to simulate network latency.
    setTimeout(() => {
      const users = Array.from(registeredUsers.values());
      resolve(users);
    }, 1000);
  });
}

// The useAuth hook is a wrapper to this service, make sure exported functions are also reflected
// in the useAuth hook.
export {
  getSession, isAuth, login, logout, sendPasswordReset, addUser, getUsers, getAuth, getRole
};
