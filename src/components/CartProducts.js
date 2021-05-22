import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setCartProducts } from "../redux/actions/cartActions";
import { removeCartProducts } from "../redux/actions/cartActions";
import { useHistory } from "react-router";

function CartProducts() {

    const cartProducts=useSelector((state)=>state.cartProducts.cartProducts);   
    const dispatch=useDispatch();
        
    const history=useHistory();

    let [cartTotal,setCartTotal]=useState(0);

    const user=useSelector((state)=>state.user);
    const fetchCartProducts= async () => {
        const response=await axios.get(`https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/cart?username=`+localStorage.getItem('loggedInUsername'),{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }}).catch((err)=>{
            console.log("Err ",err)
        })
        console.log(response)
         dispatch(setCartProducts(response.data));
        // console.log(cartProducts[2].price);

        // 1
        // let total=0;
        // for(let i=0;i<cartProducts.length;i++) {
        //     console.log(cartProducts[i].price)

        //     setCartTotal(cartTotal+cartProducts[i].price)            
        // }
        // setCartTotal(cartTotal);
        // console.log(cartTotal)
        // setCartTotal(total)
        let total=0;
        for(let i=0;i<response.data.length;i++) {
            console.log(response.data[i].price)
            total=total+response.data[i].price; 
            // setCartTotal(cartTotal+response.data[i].price)            
            // total=total+cartProducts.cartProducts.price;
            if((i+1)===response.data.length) {
                setCartTotal(total);        
            }
        }            
        // setCartTotal(cartTotal+response.data[i].price)
        console.log('this is cart total',cartTotal)
    }

    useEffect(()=>{
        fetchCartProducts();

        return () =>{
            dispatch(removeCartProducts())
            setCartTotal(0);
        }

    },[]);

    function removeProductFromCart(cartProductId) {
        console.log('this is id==>',cartProductId.cartProductId)
        axios.delete(`https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/cart?cartProductId=`+cartProductId.cartProductId,{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }}).then((res)=>{
            console.log(res)
            window.location.reload();
        }
        )
        // dispatch(removeCartProducts());
        // fetchCartProducts();
        // history.push("/cart/"+user.username)
    }

    function placeOrder() {
        console.log(user.username)
        axios.get(`https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/placeorder?username=`+localStorage.getItem('loggedInUsername'),{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }}).then((res)=>{
            console.log(res.data)
            history.push("/ordersuccess");
        })
    }

    const renderCartProducts = cartProducts.map((product)=>{
        const {cartProductId,productId,productDescription,productName,productImage,price} = product;

        return (
            <Card key={cartProductId} style={{'padding':"20px",'margin':"10px"}}>
                <Row>
                    <Col className="">
                        <img src={productImage} style={{'width':"200px",'height':"250px"}}></img>
                    </Col>
                    <Col>
                    <Row style={{'padding':"10px"}}>{productName}</Row>
                    <Row style={{'padding':"10px"}}>{productDescription}</Row>
                    <Row style={{'padding':"10px"}}>Rs. {price}</Row>
                    <Row style={{'padding':"10px"}}>
                    <Button onClick={e=>removeProductFromCart({cartProductId})}>Remove Product</Button>
                    </Row>
                    </Col>
                </Row>
            </Card>
        )
    });

    return (<Container fluid>{renderCartProducts}
                <Card style={{'padding':"20px",'margin':"10px"}}>
                <Row> {/*className="justify-content-center"*/}
                    <Col style={{'textAlign':"center"}}>
                    Cart Total :- {cartTotal}
                    </Col>
                    <Col>
                        <Button onClick={placeOrder}>
                            Place Order
                        </Button>
                    </Col>
                </Row>
            </Card>
    </Container>)
}

export default CartProducts;