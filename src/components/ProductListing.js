import React ,{useEffect} from "react";
import { useDispatch ,useSelector } from "react-redux";
import axios from "axios";
import ProductComponent from './ProductComponent'
import { setProducts } from '../redux/actions/productActions';
import { Box } from "@material-ui/core";
import { Container, Row } from "react-bootstrap";
import baseurl from './ServerApiUrl';

const ProductListing = () => {

    const dispatch=useDispatch();
    const products = useSelector((state) => state);
    console.log(products)  

    const fetchProducts= async () => {
        // const response=await axios.get("http://localhost:8081/get-all-products").catch((err)=>{
        //     console.log("Err ",err)
        // })
        const response=await axios.get("https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/product").catch((err)=>{
            console.log("Err ",err)
        })
        console.log(response)
        dispatch(setProducts(response.data))
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    return (
        <Container fluid>
            <Row>
            <ProductComponent />
            </Row>
        </Container>

    )
}

export default ProductListing;