import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductComponent() {
    const products=useSelector((state)=>state.allProducts.products);

    // const { id,title } = products[0];
    const renderList = products.map((product) => {
        const {productId, productImage, productName, price } = product;
        return (
          <Col key={productId} style={{'margin':"15px"}}>
            <Card  style={{'height':"400px"}}>
                <Link to={`/product/${productId}`} style={{'textDecoration':"none"}}>
                <div style={{'padding':"20px"}}>
                <img src={productImage} style={{'height':"250px","width":"200px",'marginLeft':"auto",'marginRight':"auto",'display':"block"}}  ></img>
                <ul style={{'listStyleType':"none",'marginLeft':"auto",'marginRight':"auto",'display':"block",'paddingTop':"20px"}}>
                  <li style={{'color':"black"}}>
                  {productName}
                  </li>
                    <li style={{'color':"black"}}>
                    Rs. {price}                  
                    </li>
                </ul>
          </div>
          </Link>
          </Card>
          </Col>
        )
    });

    return <>{renderList}</> 

}

export default ProductComponent;