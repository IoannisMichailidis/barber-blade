import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Images
import logo from '../../assets/logo.png';

// Slices
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout, removeToken } from '../../slices/authSlice';
import { resetBooking } from '../../slices/bookingSlice';

const Header = () => {
    // State Slice
    const { userInfo, token } = useSelector((state) => state.auth);
    const isOwner = userInfo && userInfo.groups && userInfo.groups.some(group => group.name === 'owner');

    // Initialize
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Api Slice
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            // Api Slice: Logout user using logout from userLoginMutation (post request to back-end)
            await logoutApiCall(token).unwrap(); // unwrap the resolved value from the promise

            // State Slice: Update the global state
            dispatch(logout());
            dispatch(removeToken());
            dispatch(resetBooking());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container >
                <LinkContainer to='/'>
                    <Navbar.Brand >
                        <img src={logo} alt="BarberShop"/>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id='basic-navbar-nav'>

                    <Nav className='ms-auto'>
                        {/* <SearchBox /> */}
                        <LinkContainer to='/'>
                                <Nav.Link >Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/gallery'>
                                <Nav.Link >Gallery</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/haircuts'>
                                <Nav.Link >Services</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/booking-barber'>
                                <Nav.Link >Book</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                                <Nav.Link >About</Nav.Link>
                        </LinkContainer>
                        { userInfo && (
                            <>
                                <LinkContainer to='/bookings'>
                                    <Nav.Link >Bookings</Nav.Link>
                                </LinkContainer>
                                <NavDropdown title={userInfo.username} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                {/* Owner */}
                                {/* Dropdown list only for the Owner */}
                                { userInfo && isOwner && (
                                    <NavDropdown title='Manage' id='ownermenu'>
                                        {/* Gallery Management */}
                                        <LinkContainer to='/owner/gallerylist'>
                                            <NavDropdown.Item>Gallery</NavDropdown.Item>
                                        </LinkContainer>
                                        {/* Haircuts Management */}
                                        <LinkContainer to='/owner/haircutlist'>
                                            <NavDropdown.Item>Services</NavDropdown.Item>
                                        </LinkContainer>
                                        {/* User Management */}
                                        <LinkContainer to='/owner/barberlist'>
                                            <NavDropdown.Item>Barbers</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header