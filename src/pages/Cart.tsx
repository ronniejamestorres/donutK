import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Image,
  List,
  ListItem,
  Text,
  useToast,
 
} from '@chakra-ui/react';


import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import '../App.css' 






type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

function Cart() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      price: 1.5,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 1.7,
      imageUrl: 'https://via.placeholder.com/150',
    },
    
    
   
  ]);
  const [cart, setCart] = useState<number[]>([]);
  const toast = useToast();

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast({
      title: 'Donut added to bag',
      status: 'success',
      duration: 1000,
      isClosable: true,
      
    });
  };

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex((id) => id === productId);
    if (index >= 0) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const removeProduct = (productId: number) => {
    const newCart = cart.filter((id) => id !== productId);
    setCart(newCart);
  
    const newProducts = products.filter((product) => product.id !== productId);
    setProducts(newProducts);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId);
      return total + (product ? product.price : 0);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateTotalPrice = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    
    <Container maxW="xl" mt={{sm:5,md:8,lg:10,xl:12}} bg={'gray.100'}>
      <Box mb={{sm:5, md:8,lg:10,xl:12}}>
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4} fontFamily={'Gloria Hallelujah'} bgColor={'pink.300'} rounded={'lg'}>
          Shopping Bag
        </Text>
      </Box>
      <List spacing={2}>
        {products.map((product) => (
          <ListItem key={product.id}>
            <Box display="flex" alignItems="center">
              <Image src={product.imageUrl} alt={product.name} mr={2} rounded={'full'}/>
              <Box flex={1}>
                <Text fontSize="lg" fontWeight="bold" fontFamily={'Gloria Hallelujah'}>
                  {product.name}
                </Text>
                <Text>${product.price}</Text>
              </Box>
              <Box display="flex">
                <Button
                  variant="ghost"
                  size="sm"
                  mr={2}
                  onClick={() => removeProduct(product.id)}
                  
                >
                  {<MdDeleteOutline/>}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  rounded={'full'}
                  color='orange.200'
                  borderColor={'orange.200'}
                  onClick={() => removeFromCart(product.id)}
                  mr={2}
                >
                  {<AiFillMinusCircle/>}
                </Button>
                <Text>{cart.filter((id) => id === product.id).length}</Text>
                <Button
                  variant="outline"
                  size="sm"
                  rounded={'full'}
                  color='pink.300'
                  borderColor={'pink.300'}
                  onClick={() => addToCart(product.id)}
                  ml={2}
                  
                >
                 {<AiFillPlusCircle/>}
                </Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box mt={6} bg="cyan.100" p={4} borderRadius={4} rounded={'xl'}>
        <Text fontSize="xl" mb={2} fontFamily={'Gloria Hallelujah'}>
          Order description
        </Text>
        <Text>
          Subtotal: <strong>${calculateSubtotal()}</strong>
        </Text>
        <Text>
          Tax: <strong>${calculateTax()}</strong>
        </Text>
        <Text>
          Total: <strong>${calculateTotalPrice()}</strong>
        </Text>
        <Button mt={4} bgColor={'pink.200'} fontFamily={'Gloria Hallelujah'}
        >
        
          Checkout
        </Button>
      </Box>
    </Container>
    
    
  );
}

export default Cart;