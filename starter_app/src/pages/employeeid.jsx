import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button, Col, Form, FormControl, FormLabel, Row, Spinner,
} from 'react-bootstrap';

import StatusAlert from '../components/StatusAlert';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';

import './auth.css';

import axios from 'axios';
import Cookies from 'js-cookie';


function Employeeid(){

  const title = "employeeid";
  const {getRoleFromEmployeeId} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const alertOpts = useRef({ isShow: false, message: '' });
  const handleDismiss = () => {
    alertOpts.current.isShow = false;
  };

  const handleLogin = async (e, data) => {
    try {
      const role = await getRoleFromEmployeeId(data.employeeId);
      
      if (role==null)
        navigate('/login');
      else if(role === "employee")
        navigate('/employee')
      else if(role === "manager")
      navigate('/console')

    } catch (err) {
      console.log(err)
      alertOpts.current = { isShow: true, message: err.message };
      setIsLoading(false);
    }
  };
  
  const {
    data, handleChange, handleSubmit, errors,
  } = useForm({
    onSubmit: handleLogin,
  });

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate>
          <i className="bi bi-person-fill auth-icon my-4"/>
          <p className="mb-3 fw-normal">
            Please enter your employee id
          </p>
          <Form.Group className="form-floating" controlId="inputEmployeeId">
            <FormControl type="text"
                         className="form-control form-input-top"
                         isInvalid={errors?.username}
                         placeholder="employeeId"
                         onChange={handleChange('employeeId')}
            />
            <FormLabel>employee id</FormLabel>
          </Form.Group>
          
          <div className="row mb-3">
          </div>
          
          <Button className="w-100 btn btn-lg btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">submit</span>
          </Button>
        </Form>
      </main>
      <StatusAlert show={alertOpts.current.isShow}
                   variant="failure"
                   message={alertOpts.current.message}
                   onDismiss={handleDismiss}
      />
    </div>
  );
}

export default Employeeid