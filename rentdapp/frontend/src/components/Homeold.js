import React from "react";
import "./Home.css"

import { useAuth0 } from '@auth0/auth0-react'
import { getDatabase, ref, child, get,set, query, equalTo, push,orderByValue } from "firebase/database";
import HeroSlider, { Slide } from "hero-slider";
/*
        <div className="hometitle">You can rely on us.</div>
        <div className="logoimage"><img src="logo.png" alt="rely"/></div>
*/

function Home () {
const smartcontract = "https://imgur.com/kZkSJ5h.png"
const blockchain = "https://imgur.com/WiZ5TKs.png"
const ipfs = "https://imgur.com/Sap9GJf.png"
    return (
        <>
            <div id="slider">
                <HeroSlider
                    autoplay={{
                        shoudAutoplay:true,
                        autoplayDuration:2000,
                    }}
                    accessability={{
                    height:"100vh",
                    shouldDisplayButtons: true,
                    shouldSlideOnArrowKeypress: true,
                    }}

                    controller={{
                        initialSlide: 1,
                        slidingDuration: 500,
                        slidingDelay: 100,
                        onSliding: (nextSlide) =>
                        console.debug("onSliding(nextSlide): ", nextSlide),
                        onBeforeSliding: (previousSlide, nextSlide) =>
                        console.debug(
                            "onBeforeSliding(previousSlide, nextSlide): ",
                            previousSlide,
                            nextSlide
                        ),
                        onAfterSliding: (nextSlide) =>
                        console.debug("onAfterSliding(nextSlide): ", nextSlide)
                    }}
                >
                    <Slide
                        background={{
                        backgroundImageSrc: smartcontract
                        }}
                    />

                    <Slide
                        background={{
                        backgroundImageSrc: ipfs
                        }}
                    />

                    <Slide
                        background={{
                        backgroundImageSrc: blockchain
                        }}
                    />
                </HeroSlider>
            </div>
        </> 
        )
}
export default Home