'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
const carouselImages = [
  "/robot1.webp",
  "/robot2.jpg",
  "/robot3.jpg",
  "/robot4.jpg",
  "/robot5.jpg",
  "/robot6.jpg",
];

const ImageCarosel=()=>{
  return (
   <div className="w-full">
     <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    duration: 0.8,
    ease: [0, 0.71, 0.2, 1.01],
    scale: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      restDelta: 0.001
    }
  }}
>
  <div className="mb-8 w-full ">
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      arrows={false}
    >
      {carouselImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Carousel image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
        </div>
      ))}
    </Slider>
  </div>
</motion.div>
   </div>
  )
}

export default ImageCarosel