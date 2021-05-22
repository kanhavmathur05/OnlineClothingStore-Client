import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setLoginUser } from "../redux/actions/userActions";
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';

function SignIn() {

    // const [user,setUser] = useState[{}];

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const dispatch=useDispatch();

    // const user=useSelector((state)=>state.user);

    const history=useHistory();

    function loginUser(e) {
        e.preventDefault();
        console.log(username)
        console.log(password)

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
          });
          console.log(user)
          const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
          });

          console.log(authDetails);

          user.authenticateUser(authDetails, 
            {
            onSuccess: (data) => {
              console.log("onSuccess: ", data);

              console.log(data.idToken.jwtToken)    //This one to send in headers to access using api gateway
                
              console.log(data.idToken.payload['custom:role'])  //This one to get the logged in users role   
              localStorage.setItem('jwtToken',data.idToken.jwtToken);
              localStorage.setItem('loggedInUsername',data.idToken.payload['cognito:username'])
              localStorage.setItem('userrole',data.idToken.payload['custom:role'])

              if(localStorage.getItem('userrole')==='ROLE_ADMIN') {
                history.push("/adminpanel")
                window.location.reload();
              }
              else {
                history.push("/");
                window.location.reload();
              }

            },
            onFailure: (err) => {
              console.error("onFailure: ", err);
            }
            ,
            newPasswordRequired: (data) => {
              console.log("newPasswordRequired: ", data);
            }
            ,
          }
          );
       }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col style={{'maxWidth':"600px", 'margin':"40px"}}>
                    <Card style={{'padding':"40px"}}>
                        <Form onSubmit={loginUser}>
                            <h2>SignIn</h2>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>setUsername(event.target.value)} />
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{'marginTop':"20px",'width':"100%"}}>
                                Login
  </Button>
                        </Form>
                    </Card>
                    <p style={{'textAlign':"center",'marginTop':"20px"}}>New User? <Link to="/signup">SignUp</Link></p>
                </Col>
            </Row>
        </Container>

    )
}

export default SignIn;