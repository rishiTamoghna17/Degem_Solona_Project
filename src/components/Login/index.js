import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import request from '../../utils/request'

import LoginImg from '../../assets/img/login.jpg'
import './style.css'

function Login() {
  return (
    <Form className="loginForm">
      <Container className="loginContainer">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <a href="/forgotpassword">Forgot Password</a>
        </Form.Group>
        <Form.Group className='LoginBtnAlign'>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form.Group>
      </Container>
      <Container>
        <img alt="no login" src={LoginImg} className="loginImg"></img>
      </Container>
    </Form>
  );
}

export default Login;