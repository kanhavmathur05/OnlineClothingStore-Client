import { Card } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setProducts } from "../redux/actions/productActions";

function AllAdminProducts() {

    const products=useSelector((state)=>state.allProducts.products);
    const dispatch=useDispatch();
    // const products = useSelector((state) => state);
    console.log(products)  
    const history=useHistory();

    const fetchProducts= async () => {
        const response=await axios.get("https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/product").catch((err)=>{
            console.log("Err ",err)
        })
        console.log(response)
        dispatch(setProducts(response.data))

    }

    function deleteProduct(productId) {
        axios.delete('https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/product?productId='+productId.productId,{headers:{
            Authorization:localStorage.getItem('jwtToken')
        }}).then((res)=>{
            console.log(res)
            window.location.reload();
        })
        console.log('this is id=====>',productId.productId)
        // dispatch()
        // history.push("/adminpanel")
    }

    useEffect(()=>{
        fetchProducts();
    },[]);


    // const { id,title } = products[0];
    const renderList = products.map((product) => {
        const {productId, productImage,productDescription , productName, price } = product;
        return (
            <Container key={productId} fluid>
          <Col style={{'margin':"15px"}}>
            <Card  style={{'height':"100%"}}>
                {/* <Link to={`/product/${id}`} style={{'textDecoration':"none"}}> */}
                <div style={{'padding':"20px"}}>
                <img src={productImage} style={{'height':"250px","width":"200px",'marginLeft':"auto",'marginRight':"auto",'display':"block"}}  ></img>
                <ul style={{'listStyleType':"none",'marginLeft':"auto",'marginRight':"auto",'display':"block",'paddingTop':"20px"}}>
                  <li style={{'color':"black",'margin':"10px"}}>
                  {productName}
                  </li>
                    <li style={{'color':"black",'margin':"10px"}}>
                    Rs. {price}                  
                    </li>
                    <li style={{'color':"black",'margin':"10px"}}>
                        {productDescription}
                    </li>
                    <li style={{'color':"black",'margin':"10px"}}>
                        <Button onClick={e=>deleteProduct({productId})}>Delete Product</Button>
                    </li>
                </ul>
          </div>
          {/* </Link> */}
          </Card>
          </Col>
          </Container>
        )
    });

    return (



        <>{renderList}</>
    )
}

export default AllAdminProducts;