import React from 'react'
import { Box } from '@chakra-ui/react'
import NavbarLanding from '../component/NavbarLanding'
import Hero from '../component/Hero'
import OurServices from '../component/OurServices'
import FooterLanding from '../component/FooterLanding'
import Testimonials from '../component/Testimonials'


function LandingPage() {
  return (
    <Box>
        <NavbarLanding />
        <Hero/>
        <OurServices />
        <Testimonials />
        <FooterLanding />
    </Box>
  )
}

export default LandingPage
