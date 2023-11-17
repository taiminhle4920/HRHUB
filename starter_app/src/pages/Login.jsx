import { useRef, useState } from 'react';''
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button, Col, Form, FormControl, FormLabel, Row, Spinner,
} from 'react-bootstrap';

import StatusAlert from '../components/StatusAlert';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import GoogleButton from 'react-google-button'
import './auth.css';


function redirectPath(search) {
  const match = search.match(/redirect=(.*)/);
  const redirect = match?.[1];
  return redirect ? decodeURIComponent(redirect) : '/console';
}

function Login(){
  const title = 'Login';

  const [isLoading, setIsLoading] = useState(false);

  const { login, getRole} = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const alertOpts = useRef({ isShow: false, message: '' });

  // const handleDismiss = () => {
  //   alertOpts.current.isShow = false;
  // };

  const redirectToGoogleSSO = async () =>{
    let timer = null;
    const googleLoginURL = `http://localhost:8080/api/login/google`
    window.location.href = googleLoginURL;
  }

  const handleLogin = async (e, data) => {
    // eslint-disable-next-line no-console
    // console.log(data.username, data.password);
    try {
      //setIsLoading(true);
      //const token = await login(data.username, data.password);

      //const res = await axios.post(`http://localhost:8080/api/login`, {email: data.username, password: data.password}, {withCredentials: true, headers: {'Content-Type': 'application/json'}});
      const res = await login(data.username, data.password);
      //setIsLoading(false);
      const role = getRole();
      //console.log(role);
      if(role === 'manager'){
        // Cookies.set('token', res.data.token);
        // Cookies.set('role', res.data.role);
        // Cookies.set('employeeId', res.data.employeeId);
        navigate('/console');
      }else{
        // Cookies.set('token', res.data.token);
        // Cookies.set('role', res.data.role);
        // Cookies.set('employeeId', res.data.employeeId);
        //temporarily navigate to profile page, need to change to /employee
        navigate('/employee');
      }

    } catch (err) {
      // Need to useRef to avoid cyclic reference of the show state in StatusAlert but we now must set alertOps
      // before a set state call so that StatusAlert can render.
      // TODO: Figure a more elegant solution for auto-dismissal alert.
      alertOpts.current = { isShow: true, message: err.message };
      setIsLoading(false);
    }
  };

  const validators = {
    username: {
      required: {
        value: true,
        message: 'username is required',
      },
    },
    password: {
      required: {
        value: true,
        message: 'password is required',
      },
    },
  };

  // Using a custom hook to show how we can build out our own hook.
  const {
    data, handleChange, handleSubmit, errors,
  } = useForm({
    onSubmit: handleLogin,
    validators,
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="container-auth text-center">
        <Form noValidate>
          <i className="bi bi-file-lock-fill auth-icon my-4"/>
          <p className="mb-3 fw-normal">
            Click <strong>Log in</strong> button to log in to user console
          </p>
          <Form.Group className="form-floating" controlId="inputUsername">
            <FormControl type="text"
                         className="form-control form-input-top"
                         isInvalid={errors?.username}
                         placeholder="Username"
                         onChange={handleChange('username')}
            />
            <FormLabel>Username</FormLabel>
          </Form.Group>
          <Form.Group className="form-floating" controlId="inputPassword">
            <FormControl type="password"
                         className="form-control form-input-bottom"
                         isInvalid={errors?.password}
                         placeholder="Password"
                         onChange={handleChange('password')}
            />
            <FormLabel>Password</FormLabel>
          </Form.Group>
          <div>
            {Object.keys(errors).map((key) => <div className="text-danger" key={key}>{errors[key]}</div>)}
          </div>
          <Form.Group as={Row} className="my-3" controlId="isRemember">
            <Col sm={{ span: 8, offset: 3 }} className="text-md-start">
              <Form.Check label="Remember me"
                          checked={data.isRemember}
                          onChange={handleChange('isRemember')} />
            </Col>
          </Form.Group>
          <div className="row mb-3">
            <div className="col-6"><Link to="/forgot">Forgot password</Link></div>
            <div className="col-6"><Link to="/signup">New account</Link></div>
          </div>
          <Button className="w-100 btn btn-lg btn-primary"
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
          >
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!isLoading} />
            <span className="px-2">Log in</span>
          </Button>
          <div className="container-signup">
        <GoogleButton 
            onClick={() => { redirectToGoogleSSO() }}/>
      </div>
        </Form>
        
      </main>
      <StatusAlert show={alertOpts.current.isShow}
                   variant="failure"
                   message={alertOpts.current.message}
                  //  onDismiss={handleDismiss}
      />
    </>
  );
}

export default Login;
