import React from 'react'
import "../CSS/Home.css"
import Navbar from '../Componenets/Navbar'
import Footer from '../Componenets/foot/Footer'

function HomePage() {
  return (
    <div id='bigBoxHome'>
      <Navbar />
      <div className='home-pic'></div>
      <div className='promo'>  <h2>India's Biggest Book Shop</h2></div>

      <Footer />

    </div>

  )
}

export default HomePage