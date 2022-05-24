import React , { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row , Col ,Image ,ListGroup ,Card , Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = ({ match }) => {
    const [product , setProduct ] = useState({})

      useEffect( () => {
          const fetchProducts = async () => {
              const {data} = await axios.get(`/api/products/${match.params.id}`)

              setProduct(data);
          }
          fetchProducts();
      }, [match])


        return (
        <>
         <Link className = 'btn btn-dark my-3' to = '/'> Go Back</Link>
         <Row>
             <Col md={6}>
                 <Image src= {product.image} alt = {product.name} fluid></Image>
             </Col>
             <Col md = {3}>
                 <ListGroup variant = 'flush'>
                     <ListGroup.Item>
                         <h4>{product.name}</h4>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Rating value = {product.rating} text = {`${product.numReviwes} Reviews`} ></Rating>
                     </ListGroup.Item>
                     <ListGroupItem>
                         Price Rs {product.price}
                     </ListGroupItem>
                     <ListGroupItem>
                         Description : {product.description}
                     </ListGroupItem>
                 </ListGroup>
             </Col>
             <Col md = {3}>
                 <Card>
                     <ListGroup variant = 'flush'>
                         <ListGroupItem>
                             <Row>
                                 <Col>Price</Col>
                                 <Col><strong>${product.price}</strong></Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroupItem>
                             <Row>
                                 <Col>Status:</Col>
                                 <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock" }</Col>
                             </Row>
                         </ListGroupItem>
                         <ListGroup.Item>
                             <Button className ='btn-block' type = 'button' disabled ={product.countInStock === 0} id = 'btz'>
                             Add to Cart 
                             </Button>
                         </ListGroup.Item>
                     </ListGroup>
                 </Card>
             </Col>
         </Row>
        </>
        )
}

export default ProductScreen
