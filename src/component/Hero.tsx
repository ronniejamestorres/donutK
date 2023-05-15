import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon
} from "@chakra-ui/react";
import { GiDonut } from "react-icons/gi";

import { motion } from "framer-motion";
import waves from "../images/waveshero.png";
import donutdetour from "../images/donutdetour.svg";
import "../App.css";

export default function hero() {
  return (
    <Box
      backgroundImage={`url(${waves})`}
      backgroundRepeat="no-repeat"
      backgroundPosition={{ base: "center", md: "center",lg:"center", xl: "center" }}
      backgroundSize={{ base: "cover", md: "cover", lg: "cover", xl: "cover" }}
      h={{ base: "100vh", md: "50vh", lg: "80vh", xl: "90vh" }}
      w={{ base: "100vw", md: "100vw", lg: "100vw", xl: "100vw" }}
    >
      <Container maxW={"6xl"}  px={{ base: 6, md: 3 ,lg:5}} py={{base:12,md:15,lg:18}}>
        <Stack
          align={"center"}
          spacing={{ base: 2, md: 5,  }}
          py={{ base: 4, md: 0, xl: 25 }}
          direction={{ base: "column", md: "row", lg: "row", xl:"row"}}
        >
          <Stack flex={1} spacing={{ base: 5, md: 5,lg:2 }}>
            <Heading
              fontFamily={"Gloria Hallelujah"}
              lineHeight={1.3}
              fontWeight={600}
              fontSize={{
                base: "3xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
                xl: "6xl",
              }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  bg: "pink.300",
                  zIndex: -1,
                }}
              >
                Donuts Kingdom,
              </Text>
              <br />
              <Text as={"span"} color={"pink.300"}>
                eat
              </Text>
              <br />
              <Text as={"span"} color={"orange.300"}>
                everywhere!
              </Text>
            </Heading>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button fontFamily={'Gloria Hallelujah'}
            as={"a"}
            display={{ base: "inline-flex", md: "inline-flex", lg: "inline-flex" }}
            
                rounded={'full'}
                size={{base:"md",md:"md",lg:"lg",xl:"lg"}}
                fontWeight={'bold'}
                px={2}
                bgColor={'pink.400'}
                colorScheme={'pink'}
                textColor={'white'}
                _hover={{ bg: 'pink.200',text:'white' }}
                variant={'link'}
                href={'/Showall'}
                >
                
          
               <Text mr="2">Go shopping</Text>
               <Icon as={GiDonut} boxSize="6" />
          </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"600px"}
              width={"full"}
              overflow={"hidden"}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 4, loop: Infinity },
                }}
              >
                <Image
                  alt={"Hero Image"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "280px", md: "320px",lg: "350px", xl: "500px" }}
                  src={donutdetour}
                />
              </motion.div>
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
