import React from 'react'
import HeaderLanding from '../Components/HeaderLanding'
import KorzinkaSwiper from '../Components/KorzinkaSwiper'
import LandingProducts from '../Components/LandingProducts'
import Snowfall from '../Components/Snowfall'
import BackgroundAnimation from '../Components/BackgroundAnimation'

const LandingPage = () => {
    return (
        <div>
            <BackgroundAnimation />
            <KorzinkaSwiper />
            <LandingProducts />

        </div>
    )
}

export default LandingPage