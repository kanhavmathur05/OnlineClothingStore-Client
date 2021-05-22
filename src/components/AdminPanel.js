import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function AdminPanel() {
    return (
        <Container fluid>
            <Row style={{"marginTop":"20px"}}>
                <Col>
                <Link to="/adminpanel/addproduct" style={{'height':"150px",'width':"100%"}} className="btn btn-primary">
                <p style={{'paddingTop':"50px"}}>Add Product</p>
                </Link>
                </Col>
                <Col>
                    <Link to="/adminpanel/allproducts" style={{'height':"150px",'width':"100%"}} className="btn btn-primary">
                        <p style={{'paddingTop':"50px"}}>View All Products</p>
                    </Link>
                </Col>
                {/* <Col>
                    <Link to="adminpanel/usermanagement" style={{'height':"150px",'width':"100%"}}>
                        User Management
                    </Link>
                </Col> */}
            </Row>
        </Container>
    )
}

export default AdminPanel;