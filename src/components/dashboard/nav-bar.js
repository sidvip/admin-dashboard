import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BellFill, BoxArrowRight, EnvelopeFill, List } from '../../../node_modules/react-bootstrap-icons/dist/index';
import { Form, useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { FormControl } from '../../../node_modules/react-bootstrap/esm/index';
import Tag from '../utility/tag';
import { selectUtility, setLeftNavOpenState } from "../../redux/utility.slice";
import { useDispatch, useSelector } from 'react-redux';

export default function TopNavBar() {
    const { leftNav } = useSelector(selectUtility);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" className='shadow-xl relative'>
            <Container fluid>
                <Navbar.Brand>
                    <List className='bg-[#00B493] w-10 h-8 rounded-md p-1 text-white cursor-pointer' onClick={() => dispatch(setLeftNavOpenState(leftNav.open === true ? false : true))} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search for something..."
                                className="me-2 border-none"
                                aria-label="Search for something..."
                            />
                        </Form>
                    </Nav>
                    <Nav className='flex items-center gap-2 text-gray-800'>
                        <Nav.Link href="#inbox" className='relative'>
                            <EnvelopeFill size={20} />
                            <Tag value={JSON.parse(localStorage.getItem('userData'))[localStorage.getItem('email')]['inbox']?.filter((e) => e.read === false).length || 0} type='primary' className='absolute -top-1 -right-1' />
                        </Nav.Link>
                        <Nav.Link href="#notifications" className='relative'>
                            <BellFill size={20} />
                            <Tag value={10} type='secondary' className='absolute -top-1 -right-1' />
                        </Nav.Link>
                        <Nav.Link eventKey={2} className='flex items-center gap-2 text-md font-bold' onClick={() => {
                            localStorage.removeItem('loggedIn');
                            localStorage.removeItem('email');
                            // location.reload();
                            navigate('/login');
                        }}>
                            <BoxArrowRight size={20} /> Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
