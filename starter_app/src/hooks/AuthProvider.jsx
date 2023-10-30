import React from 'react';
//fix everything here to authorize users and managers


// import {
//   getSession, isAuth, login, logout, sendPasswordReset, addUser, getUsers,
// } from '../services/MockAuthService';

const AuthContext = React.createContext(null);

const isAuth = async () =>{
  
}


function AuthProvider({ children, ...rest }) {
  // AuthContext to encapsulate these functions, which are wrappers to the services service.
  const auth = {
    getSession,
    isAuth,
    login,
    logout,
    sendPasswordReset,
    addUser,
    getUsers,
  };

  return (
    <AuthContext.Provider value={auth} {...rest}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
