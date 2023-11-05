import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function LoginSuccess() {

const {setGoogleUser, getRole} = useAuth();
const navigate = useNavigate();

useEffect(()=>{
      const setGoogleUserWrapper = async () =>{
        const user = await setGoogleUser();
        console.log(user);
        const role = getRole();
        console.log(role)
        if (role==null)
          navigate('/employeeid');
        else if(role === "employee")
          navigate('/employee')
        else if(role === "manager")
        navigate('/console')
      };

      setGoogleUserWrapper();
}, []);

  return (
    <div>
      Login Success
    </div>
  );

}

export default LoginSuccess;