import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import img1 from '../../assets/food1.png'
import img2 from '../../assets/food2.png'
import img3 from '../../assets/food3.png'
import './styles.css'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className=''>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}>
        <SwiperSlide className='relative'>
          <div className='absolute flex flex-col justify-center items-center w-full h-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
            >
              <h1 className='text-2xl md:text-4xl lg:text-5xl text-center font-bold text-primary'>Share Your Surplus</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.7,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
            >
              <p className='md:text-xl lg:text-2xl text-center font-semibold mb-3 mt-2 lg:mb-8 mb:mt-5 text-primary'>Reduce waste by sharing excess food with your community.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 1.5,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
            >
              <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to={'/addFood'} className='btn btn-primary btn-sm md:btn md:text-lg lg:text-xl text-white md:text-white font-montserrat'>Add Food Now</Link>
              </motion.div>
            </motion.div>
          </div>

          <img src={img1} alt="" className='rounded' />
        </SwiperSlide>
        <SwiperSlide>
          <div className='absolute flex flex-col justify-center items-center w-full h-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 3.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}>
              <h1 className='text-2xl md:text-4xl text-center lg:text-5xl font-bold text-primary'>Discover Local Delights</h1></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 4,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}>
              <p className='md:text-xl lg:text-2xl text-center font-semibold mb-3 mt-2 lg:mb-8 mb:mt-5 text-primary'>Find fresh and delicious food items available near you.</p></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 4.5,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }} >
              <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link to={'/availableFoods'} className='btn btn-primary btn-sm md:btn md:text-lg lg:text-xl text-white md:text-white font-montserrat'>See available Foods</Link>
              </motion.div>
            </motion.div>
          </div>
          <img src={img2} alt="" className='rounded' />
        </SwiperSlide >
        <SwiperSlide>
          <div className='absolute flex flex-col justify-center items-center w-full h-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 6.5,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }} >
              <h1 className='text-2xl md:text-4xl text-center lg:text-5xl font-bold text-primary'>Join the Movement</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 7,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }} >
              <p className='md:text-xl lg:text-2xl text-center font-semibold mt-2 mb:mt-5 text-primary'>Help us create a sustainable future by connecting and sharing.</p>
            </motion.div>
          </div>
          <img src={img3} alt="" className='rounded' />
        </SwiperSlide>
      </Swiper >
    </div >
  );
}

export default Banner;