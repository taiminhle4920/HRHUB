import React from 'react';
//fix everything here to authorize users and managers


import {
  getSession, isAuth, login, logout, sendPasswordReset, addUser, getUsers, setGoogleUserGoogle, getRole
} from '../services/MockAuthService';

const AuthContext = React.createContext(null);

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
    setGoogleUserGoogle,
    getRole,
  };

  return (
    <AuthContext.Provider value={auth} {...rest}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
