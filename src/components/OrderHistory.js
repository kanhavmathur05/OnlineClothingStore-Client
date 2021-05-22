import axios from "axios";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { removeOrderHistoryProducts, setOrderHistoryList } from "../redux/actions/orderHistoryActions";

function OrderHistory() {

    const orderHistoryList=useSelector((state)=>state.orderHistoryList.orderHistoryList);   
    const dispatch=useDispatch();
        
    const history=useHistory();
    const user=useSelector((state)=>state.user);


    const fetchOrderHistory= async () => {
        const response=await axios.get(`https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/orderhistory?username=`+localStorage.getItem('loggedInUsername'),{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }})
        .catch((err)=>{
            console.log("Err ",err)
        })
        console.log(response.data)
        dispatch(setOrderHistoryList(response.data));
    }

    useEffect(()=>{
        fetchOrderHistory();

        return () =>{
            dispatch(removeOrderHistoryProducts())
        }
    },[user.username])


    const renderOrderHistory = orderHistoryList.map((orderHistoryProduct)=>{
        const {orderHistoryId,productDescription,productName,productImage,price} = orderHistoryProduct;

        return (
            <Card key={orderHistoryId} style={{'padding':"20px",'margin':"10px"}}>
                <Row>
                    <Col className="">
                        <img src={productImage} style={{'width':"200px",'height':"250px"}}></img>
                    </Col>
                    <Col>
                    <Row style={{'padding':"10px"}}>{productName}</Row>
                    <Row style={{'padding':"10px"}}>{productDescription}</Row>
                    <Row style={{'padding':"10px"}}>Rs. {price}</Row>
                    <Row style={{'padding':"10px"}}>
                    </Row>
                    </Col>
                </Row>
            </Card>
        )
    });
    

    return <>{renderOrderHistory}</>
}

export default OrderHistory;