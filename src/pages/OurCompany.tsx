import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../component/NavbarOurCompany";
import GridCardsTest from "../component/GridCardsTest";
import backgroundImage from "../images/bg-grey-01.svg";
import SearchSection from "../component/SearchSection";

import FooterLanding from "../component/FooterLanding";
import AboutUs from "../component/AboutUs";
import ContactUs from "../component/ContactUs";

function OurCompany() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

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
      <AboutUs />
      <ContactUs />
      <FooterLanding />
    </Box>
  );
}

export default OurCompany;
