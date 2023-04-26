import Modal from 'react-bootstrap/Modal';
import LoginBackground from "./login-background"
import LoginForm from './login-form';

export default function LoginPage() {
    return (
        <div className="">
            <LoginBackground />
            <Modal
                show={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}