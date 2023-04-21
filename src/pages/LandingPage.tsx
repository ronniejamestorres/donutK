import React from 'react'
import { Box } from '@chakra-ui/react'
import NavbarLanding from '../component/NavbarLanding'
import Hero from '../component/Hero'
import OurServices from '../component/OurServices'

function LandingPage() {
  return (
    <Box>
        <NavbarLanding />
        <Hero/>
        <OurServices />
    </Box>
  )
}

export default LandingPage