import './App.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './config.init'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);
function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false);

  const nameHandler = (event) => {
    setName(event.target.value);
  }

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const registerToggle = event => {
    setRegistered(event.target.checked);
  }

  const submitHandler = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    event.preventDefault();

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password must have a special character');
      console.log(password)
      return
    }

    setError('');


    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => console.log(result.user))
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          console.log(result.user)
          setEmail('');
          setPassword('');
          sendVerificationEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error)
          setError(error.message);
        })
    }

  }

  const sendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(console.log('Email sent'));
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(console.log('Setting user name'))
      .catch(error => setError(error.message))
  }

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => console.log('Password reset email sent'))
      .catch(error => {
        console.log(error)
        setError(error.message)
      })
  }

  return (
    <div>
      <div className='w-50 mx-auto border border-2 p-3 rounded-3 mt-4'>

        <h2 className='text-center'>{registered ? 'Login' : 'Register'}</h2>

        <Form noValidate validated={validated} onSubmit={submitHandler}>

          {
            !registered && <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control required onBlur={nameHandler} type="text" placeholder="Your Name" />
              <Form.Control.Feedback type="invalid">
                Please provide User Name.
              </Form.Control.Feedback>
            </Form.Group>
          }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required onBlur={emailHandler} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email .
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required onBlur={passwordHandler} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">
              Please choose a password   .
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={registerToggle} type="checkbox" label="Already Registered" />
          </Form.Group>

          <Button variant={registered ? 'success' : 'primary'} type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
          <Button onClick={resetPassword} variant="link">Reset Password</Button>
          <p className='text-danger mt-4'>{error.slice(22)}</p>
        </Form>
      </div>
    </div>
  )
}

export default App
