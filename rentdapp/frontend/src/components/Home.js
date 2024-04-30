//首頁頁面
import React,{ useState, useEffect } from "react";
import "./Home.css"

function Home ({images}) {
    const [current, setCurrent] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)
    let timeOut = null
    useEffect(() => {
        timeOut = autoPlay && setTimeout(()=>{slideRight()},2500)
    })

    const slideRight = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1)
    }

    const slideLeft = () => {
        setCurrent(current === 0 ? images.length -1 : current - 1)
    }
    return (
        <>
            
            <img className="carimage" src="car.png" alt="car"/>
            <img className="houseimage" src="house.png" alt="house"/>
            <img className="recimage" src="recrely.png" alt="rectangle"/>

            <div className="carousel" onMouseEnter={() => {
                setAutoPlay(false)
                clearTimeout(timeOut)
            }} 
                onMouseLeave={() => {
                    setAutoPlay(true)
            }}>
            
                
                <div className="carousel_wrapper">
                    {images.map((image, index) => {
                        return ( <div key={index} className={index==current ? "carousel_card carousel_card-active" : "carousel_card"}>
                            <img className="card_image" src={image.image} alt="" />
                        </div>
                        )
                    })}
                    <div className="carousel_arrow_left" onClick={slideLeft}>
                        &lsaquo;
                    </div>
                    <div className="carousel_arrow_right" onClick={slideRight}>
                        &rsaquo;
                    </div>
                    <div className="carousel_pagination">
                        {images.map((_,index) => {
                            return (
                                <div key={index} className={index==current ? "pagination_dot pagination_dot-active" : "pagination_dot"} onClick={() => setCurrent(index)}></div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </> 
        )
}
export default Home 