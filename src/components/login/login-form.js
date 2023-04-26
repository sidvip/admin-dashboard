import Form from 'react-bootstrap/Form';
import InputGroup from '../../../node_modules/react-bootstrap/esm/InputGroup';
import Row from '../../../node_modules/react-bootstrap/esm/Row';
import { Lock, PcDisplay } from '../../../node_modules/react-bootstrap-icons/dist/index';
import Button from '../../../node_modules/react-bootstrap/esm/Button';
import { useState } from 'react';
import users from '../../mock-data/users.json';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/utility.slice';
import { useLocation } from '../../../node_modules/react-router-dom/dist/index';
import Spinner from 'react-bootstrap/Spinner';

export default function LoginForm() {

    const [data, setData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const location = useLocation();

    const handleSubmit = (event) => {
        const userInfo = users[data.email];
        if (userInfo && users[data.email]['password'] === data.password) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('email', data.email);
            // navigate("/");
            location.reload();
        } else {
            dispatch(showToast({
                data: { heading: "Login Failed", content: "Please enter valid credentials" },
                show: true
            }));
        }
        event.preventDefault();
    };

    return (
        <Form className='flex flex-col lg:p-20 md:p-20 p-8' onSubmit={handleSubmit}>
            <Row className='flex flex-col items-center m-10'>
                <PcDisplay className='text-4xl' />
                <label className='text-xl md:text-3xl flex justify-center mt-2 w-max-content'>
                    Admin Portal
                </label>
            </Row>
            <Form.Group as={Row} className='mt-4'>
                <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                    Password
                </Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                        id="inlineFormInputGroupUsername"
                        placeholder="Email"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        type='email'
                        required
                        isInvalid={!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g.test(data.email) && data.email !== ""}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Row} className='mt-4'>
                <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                    Password
                </Form.Label>
                <InputGroup hasValidation>
                    <InputGroup.Text><Lock /></InputGroup.Text>
                    <Form.Control
                        id="inlineFormInputGroupUsername"
                        placeholder="Password"
                        type='password'
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid password.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Row className='mt-10 flex-1 flex justify-center'>
                <Button variant="primary" type="submit" className='bg-blue-500 border-none w-[50%]' disabled={!(data.email && data.password)}>
                    Sign In
                </Button>
            </Row>
        </Form>
    )
}