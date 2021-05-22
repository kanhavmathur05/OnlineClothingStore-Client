import { Button, Form, FormControl, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setUserLogout } from "../redux/actions/userActions";

function Header() {

  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  const user=useSelector((state)=>state.user);

  function logoutUser() {
    dispatch(setUserLogout());
    history.push("/");
    localStorage.clear();
    window.location.reload();
  }

  function redirectToCart() {
    history.push("/cart")
  }

  function redirectToOrderHistory() {
    history.push("/orders")
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/"><Navbar.Brand >Online Clothing Store</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ 'width': "400px" }} />
          <Button variant="outline-success">Search</Button>
        </Form>
        {/* <Link to="/orders">Orders</Link> */}
        {
        // Object.keys(loggedInUser).length === 0 ? (
          localStorage.getItem('loggedInUsername') === null ? (
          <div>
            <Link to="/signin" style={{ 'textDecoration': "none", 'color': "white", "paddingLeft": "20px", 'paddingRight': "20px" }}>Login</Link>
          </div>
        ) : (<Row>
          <NavDropdown id="navbarScrollingDropdown" title={localStorage.getItem('loggedInUsername')} style={{'paddingLeft':"20px",'paddingRight':"10px"}}>
          {/* {Object.keys(loggedInUser.authorities[0].authority==='ROLE_USER' ?   */}
                        <NavDropdown.Item onClick={redirectToOrderHistory} >Order History</NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>

          </NavDropdown>
          {/* <Link to="/"><Button onClick={logoutUser}>Logout</Button></Link> */}
          <Button  style={{'paddingRight':"30px",'paddingTop':"4px",'width':"10px",'marginRight':"20px"}} className="btn btn-dark"><svg onClick={redirectToCart} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">  {/*class="bi bi-cart4"*/}
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg></Button>

        </Row>
        )}

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;