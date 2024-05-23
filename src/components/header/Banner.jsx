import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import img1 from '../../assets/food1.png'
import img2 from '../../assets/food2.png'
import img3 from '../../assets/food3.png'
import './styles.css'

const Banner = () => {
  return (
    <div className='mt-10'>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper">
        <SwiperSlide><img src={img1} alt="" className='rounded' /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" className='rounded' /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" className='rounded' /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Banner;