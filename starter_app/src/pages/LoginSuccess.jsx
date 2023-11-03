import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function LoginSuccess() {

const {addUser, getAuth, isAuth} = useAuth();
const navigate = useNavigate();

useEffect(()=>{
      const setGoogleUserGoogleWrapper = async () =>{
        const user = await setGoogleUserGoogle();
        console.log(user);
      };
      setGoogleUserGoogleWrapper();
      setTimeout(() => {
        navigate('/console');
      }, 100);
}, []);

  return (
    <div>
      Login Success
    </div>
  );
}

export default LoginSuccess;