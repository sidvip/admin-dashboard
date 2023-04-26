import Modal from 'react-bootstrap/Modal';
import ListGroup from '../../../node_modules/react-bootstrap/esm/ListGroup';
import { X } from '../../../node_modules/react-bootstrap-icons/dist/index';

export default function ExistingEmailsList({ show, handleClose }) {
    const userData = JSON.parse(localStorage.getItem('userData'));

    return (

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className='flex justify-between'>
                <Modal.Title>Existing Emails and Passwords</Modal.Title>
                <X onClick={handleClose} className='text-2xl cursor-pointer' />
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {
                        Object.keys(userData).map((_e) => (
                            <ListGroup.Item key={_e} className='flex justify-center'>{_e} : {userData[_e].password}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}
