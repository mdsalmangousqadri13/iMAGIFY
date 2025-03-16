import React from 'react'
import Header from '../componenet/Header'
import Steps from '../componenet/Steps'
import Description from '../componenet/Description'
import Testimonials from '../componenet/Testimonials'
import GenerateBtn from '../componenet/GenerateBtn'

const Home = () => {
  return (
    <div>
        <Header />
        <Steps />
        <Description />
        <Testimonials />
        <GenerateBtn />
    </div>
  )
}

export default Home