import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../component/Navbar";
import backgroundImage from "../images/bg-grey-01.svg";
import FooterLanding from "../component/FooterLanding";
import Contact from "../component/Contact";

function ContactUs() {
  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize={{ base: "cover", md: "cover" }}
      h="100vh"
      w="100vw"
    >
      <Navbar />
      <Contact />
      <FooterLanding />
    </Box>
  );
}

export default ContactUs;
