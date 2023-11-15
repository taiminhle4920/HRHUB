import React, { Component, useEffect, useState } from "react";
import { Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const [hasAuth, setHasAuth] = useState(true)

    var token = null;
    useEffect(()=>{
      const getAuthWrapper = async () =>{
        token = await auth.getAuth();
      };
      getAuthWrapper();
    }, []);


    if (!token) {
      console.log("test")
      return <Navigate to="/home" replace state={{ from: location }} />;
    }
    return children;
  };

  export default ProtectedRoute