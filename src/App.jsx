import './App.css'
import { getAuth } from "firebase/auth";
import app from './config.init'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';

const auth = getAuth(app);
function App() {

  const emailHandler = (event) => {
    console.log(event.target.value);
  }

  const passwordHandler = (event) => {
    console.log(event.target.value);
  }

  const submitHandler = () => {
    event.preventDefault();
  }

  return (
    <div>
      <div className='w-50 mx-auto border border-2 p-3 rounded-3 mt-4'>
        <h2 className='text-center'>Register</h2>
        <Form onClick={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={emailHandler} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={passwordHandler} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default App
