import { useParams } from "react-router";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProduct, selectectedProduct } from "../redux/actions/productActions";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function ProductDetail() {


    const product = useSelector((state)=>state.product);
    const { productId }=useParams();
    const dispatch=useDispatch();

    const user=useSelector((state)=>state.user)

    const { productImage, price, productDescription, productName } = product;

    const fetchProductDetails= async () => {
        // const response = await axios.get(`http://localhost:8081/get-product/${productId}`).catch(err => {
        //     console.log(err)
        // })
        const response = await axios.get(`https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/product?`+`productId=`+`${productId}`).catch(err => {
            console.log(err)
        })
        console.log(response.data)
        dispatch(selectectedProduct(response.data));
    };

    useEffect(()=>{
        if(productId && productId !=="") fetchProductDetails();

        return () =>{
            dispatch(removeSelectedProduct())
        }
    },[productId])

    function performAddToCart() {
        const request={
            productId: product.productId,
            username:localStorage.getItem('loggedInUsername'),
            price:product.price,
            productDescription:product.productDescription,
            productImage:product.productImage,
            productName:product.productName
        }
        console.log(request);
        axios.post("https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/cart",request,{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }}).then((res)=>{
            console.log(res);
        })

        // axios.get('http://localhost:8082/cart-products/'+user.username).then((res)=>{
        //     console.log(res);
        // })
    }

    console.log(product)
    return (
        <div>
            {Object.keys(product).length===0 ? (
                <div>Loading...</div>
            ):(
                <Container>
                        <Card style={{'margin':"20px"}} key={product.productId}>
                    <Row >

                        <Col>
                        <img src={productImage} style={{'height':"500px","margin":"20px"}}></img>
                        </Col>
                        <Col>
                            <div style={{'margin':"40px"}}>
                                <p>{productName}</p>
                                <p>{productDescription}</p>
                                <p>Rs.{price}</p>
                                <Button onClick={performAddToCart}>Add To Cart</Button>
                            </div>
                        </Col>
                    </Row>
                    </Card>
                </Container>
            )}
        </div>
    );
}

export default ProductDetail;