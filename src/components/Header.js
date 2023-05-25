import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

    return <header>
         <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">Liga Sportive</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/cart">< i className='glyphicon glyphicon-shopping-cart'></i> Panier</Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <Nav.Link href="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                </Nav.Link>
                <NavDropdown.Item onClick={logoutHandler}>
                  Déconnexion
                </NavDropdown.Item>
              </NavDropdown>
            ) : <Nav.Link href="/login">< i className='fas fa-user'></i>Connexion</Nav.Link> }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
}

export default Header;