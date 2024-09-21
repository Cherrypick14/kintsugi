import React from 'react'
import Footer from '../components/Footer'
import HeroSection from '../components/Hero'
import HowItWorks from '../components/Howitworks'
import FeaturesSection from '../components/Featuresection'
import StoriesSection from '../components/Storiessection'
import Header from '../components/Header'
import TrustSection from '../components/Trustsection'
import Chatbot from '../components/chatbot'

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <StoriesSection />
      <TrustSection />
      <Chatbot />
      <Footer />
    </div>
  )
}

export default Home