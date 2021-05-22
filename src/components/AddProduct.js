import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import S3 from 'react-aws-s3';
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

function AddProduct() {

    const history=useHistory();

    const config = {
        bucketName: 'shopifyproductimagesbucket',
        // dirName: 'media', /* optional */
        region: 'us-east-2',
        accessKeyId: 'AKIAWGUEJCIORNVIPKNG',
        secretAccessKey: '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',
        // s3Url: 'https://shopifyproductimagesbucket.s3.us-east-2.amazonaws.com/', /* optional */
    }
    // moviesimages.jpg
    const ReactS3Client = new S3(config);
    
    const fileInput=useRef();

    function addProduct(e) {
        e.preventDefault();

        let newProduct={
            productName:e.target.formBasicProductName.value,
            productDescription:e.target.formBasicProductDescription.value,
            price:e.target.formBasicPrice.value,
            productImage:""
        }

        let file=fileInput.current.files[0];
        let newfilename=fileInput.current.files[0].name;

        console.log('add product method clicked')
        console.log(e.target.formBasicProductImage.value.replace())
    
        const response = ReactS3Client
        .uploadFile(file, newfilename)
        .then(data =>{
            console.log(data.location)
            newProduct.productImage=data.location;
            console.log(newProduct)

            // axios.post('http://localhost:8081/add-product',newProduct).then((res)=>{
            //     console.log(res.data)
            // })
            axios.post('https://vv83mrk46j.execute-api.us-west-2.amazonaws.com/test/product',newProduct,{ headers: {
                Authorization : localStorage.getItem('jwtToken') 
            }}).then((res)=>{
                console.log(res.data)
                // useHistory('/')
                window.location.reload()
            })
        }         
        )
        .catch(err => console.error(err));
        
        console.log('response',response)
        // newProduct.productImage.replace("",data.location);
        //TODO- set location of file/data in a product object as product image and hit the save product API

        console.log('final product values-->',newProduct)
        // history.push("/adminpanel/allproducts")
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col style={{'maxWidth':"600px", 'margin':"40px"}}>
                    <Card style={{'padding':"40px"}}>
                        <Form onSubmit={addProduct}>
                            <h2>Add Product Details</h2>
                            <Form.Group controlId="formBasicProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Name" />
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicProductDescription">
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Description" />
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter Product Price" />
                                <Form.Text className="text-muted">
                                    {/* We'll never share your email with anyone else. */}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicProductImage">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" ref={fileInput} placeholder="Add Product Image" />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Button variant="primary" type="submit">
                                Add Product
  </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default AddProduct;