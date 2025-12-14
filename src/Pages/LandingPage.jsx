import React, { useEffect } from 'react'
import HeaderLanding from '../Components/HeaderLanding'
import KorzinkaSwiper from '../Components/KorzinkaSwiper'
import LandingProducts from '../Components/LandingProducts'
import Snowfall from '../Components/Snowfall'
import BackgroundAnimation from '../Components/BackgroundAnimation'
import DonatePromo from '../Components/DonatePromo'

const LandingPage = () => {



    return (
        <div>
            <BackgroundAnimation />
            <KorzinkaSwiper />
            <LandingProducts />
            <DonatePromo />

        </div>
    )
}

export default LandingPage