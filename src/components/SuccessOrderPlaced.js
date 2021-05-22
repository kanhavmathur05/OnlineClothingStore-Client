import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";

function SuccessOrderPlaced() {

    const history = useHistory();

    function redirectContinueShopping() {
        history.push("/");
    }

    return (
        <Container fluid>
            <Card style={{'margin':"20px"}}>
                <Row>
                    <Col>
                        <Row className="justify-content-center" style={{'padding':"100px"}}>
                            <Col>
                            <Row className="justify-content-center" style={{'padding':"10px"}}>
                            <h3>Thanks for Shopping. Your order is successfully placed.</h3>
                            </Row>
                            <Row className="justify-content-center" style={{'padding':"10px"}}>
                            <Button onClick={redirectContinueShopping}>Continue Shopping</Button>
                            </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default SuccessOrderPlaced;