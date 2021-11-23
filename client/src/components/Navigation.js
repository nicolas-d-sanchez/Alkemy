import { Dropdown, Nav, Navbar, Row, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./nabvar.css";
import { NavLink } from "react-router-dom";
import useAuth from "../Auth/useAuth";



export default function Navigation() {
  let auth = useAuth(); 

  if(auth.login){

    
    return (    
      <Navbar fixed="top" bg="primary" variant="dark" id="navbar" expand="lg">
        <Navbar.Brand >
          {" "}
          Alkemy <span id="navbar-sub-brand">Presupuesto personal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">            
            <NavDropdown
              title="Cuenta"
              id="responsive-nav-dropdown"
              drop="start"                       
            >
              <Dropdown.Header id="dropdown-header">
                <Row>
                  <FontAwesomeIcon icon={faUserCircle} />
                </Row>
                <Row>{auth.store.user}</Row>
              </Dropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/balances">
                Presupuesto
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => {
                  localStorage.clear();
                  window.location.href = '/'     
                }} >
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }else{
    return (    
      <Navbar fixed="top" bg="primary" variant="dark" id="navbar" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          {" "}
          Alkemy <span id="navbar-sub-brand">Presupuesto personal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login" >
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register">
              Registro
            </Nav.Link>            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }  
}
