import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function LoginSuccess() {

const {addUser, getAuth, isAuth} = useAuth();
const navigate = useNavigate();

useEffect(()=>{
      const getAuthWrapper = async () =>{
        const user = await getAuth();
        console.log(user);
      };
      getAuthWrapper();
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