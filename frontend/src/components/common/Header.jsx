import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaList  } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Images
import logo from '../../assets/logo.png';

// Components
// import SearchBox from './SearchBox';

// Slices
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout, removeToken } from '../../slices/authSlice';
// import { resetCart} from '../../slices/cartSlice';

const Header = () => {
    // get data from the global state using useSelector
    // const { cartItems } = useSelector((state) => state.cart);
    const { userInfo, token } = useSelector((state) => state.auth)

    // console.log(userInfo.token)
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

            // Redirect the user

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
                        BarberShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    {/* <Nav className='mb-2'> */}
                        {/* Collection */}
                        {/* <NavDropdown title='Hat Collection' id='collectionmenu' > */}
                            {/* All Hats */}
                            {/* <LinkContainer to='/haircuts'> */}
                                {/* <NavDropdown.Item>All Haircuts</NavDropdown.Item> */}
                            {/* </LinkContainer> */}
                            {/* Fedora */}
                            {/* <LinkContainer to='/haircuts/fedora'> */}
                                {/* <NavDropdown.Item>Kids</NavDropdown.Item> */}
                            {/* </LinkContainer> */}
                            {/* Bowler */}
                            {/* <LinkContainer to='/haircuts/bowler'> */}
                                {/* <NavDropdown.Item>Men</NavDropdown.Item> */}
                            {/* </LinkContainer> */}
                            {/* Cowboy */}
                            {/* <LinkContainer to='/products/cowboy'>
                                <NavDropdown.Item>Cowboy</NavDropdown.Item>
                            </LinkContainer> */}
                        {/* </NavDropdown> */}
                    {/* </Nav> */}

                    <Nav className='ms-auto'>
                        {/* <SearchBox /> */}
                       
                        <LinkContainer to='/'>
                                <Nav.Link >Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/haircuts'>
                                <Nav.Link >Haircuts</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/booking-barber'>
                                <Nav.Link >Book</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                                <Nav.Link >About</Nav.Link>
                        </LinkContainer>
           
                        {/* User */}
                        {/* { userInfo && !userInfo.isAdmin && (
                        <LinkContainer to='/myOrders'>
                            <Nav.Link >
                                <FaList /> My Orders
                            </Nav.Link>
                        </LinkContainer>
                        )} */}
                         {/* Barber & Owner*/}
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
                            </>
                        ) }
                        {/* : (
                            <LinkContainer to='/login'>
                                <Nav.Link ><FaUser/>Sign In</Nav.Link>
                            </LinkContainer>
                        )} */}
                        {/* Owner */}
                        {/* Dropdown list only for the Owner */}
                        {/* { userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'> */}
                                {/* Products Item */}
                                {/* <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer> */}
                                {/* Users Item */}
                                {/* <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer> */}
                                {/* Orders Item */}
                                {/* <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header