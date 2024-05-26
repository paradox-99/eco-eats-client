import Banner from "../../header/Banner";
import img1 from '../../../assets/pic1.jpg'
import img2 from '../../../assets/thumb.jpg'
import FeaturedFoods from "./FeaturedFoods";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { ImQuotesLeft } from "react-icons/im";
import './styles.css'

const Home = () => {

    const { isPending, isError, error, data: foods } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/foods-home');
            return res.data;
        }
    })

    if (isPending)
        return <div className="flex items-center justify-center w-full h-[600px]"><Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>

    if (isError)
        return <p>{error.message}</p>

    return (
        <div>
            <Banner></Banner>
            <div className="my-20 flex flex-col md:flex-row gap-5">
                <div className="flex items-center justify-center flex-col md:w-[50%]">
                    <p className="text-xl font-montserrat mb-4 font-semibold text-center">Food sharing <br /> & <br />Surplus Reduction Platform</p>
                    <h1 className="font-pirata text-7xl text-center">Welcome to <span className="text-primary">EcoEats</span></h1>
                    <p className="text-lg mt-3 text-justify">Join us in our mission to reduce food waste and build a stronger community! Discover how you can share surplus food, connect with neighbors, and make a positive impact on the environment. Together, we can create a sustainable future and ensure everyone has access to nutritious meals.
                        <br /><br />
                        Explore, share, and support – welcome to <span className="text-primary font-semibold ">EcoEats!</span></p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 md:w-[50%] gap-5">
                    <img src={img1} alt="" className="w-full h-[200px] col-span-2" />
                    <img src={img2} alt="" className="h-[200px]" />
                    <div className="h-full bg-primary w-full rounded-md place-self-center content-center">
                        <h1 className="font-pirata text-5xl text-white text-center">Sharing <br /> since <br /> 2015</h1>
                    </div>
                </div>
            </div>
            <div className="mb-20">
                <div className="mb-10">
                    <h1 className="font-pirata text-7xl text-center mb-3">Featured Foods</h1>
                    <p className="text-center font-medium text-xl">Discover our top food options with the highest quantities available. Enjoy a variety of generous offerings ready to be shared with the community!</p>
                </div>
                <div className="flex flex-wrap justify-center gap-10">
                    {
                        foods?.map(food => <FeaturedFoods
                            key={food.donatorId}
                            food={food}
                        ></FeaturedFoods>)
                    }
                </div>
                <div className="mt-10 flex justify-center">
                    <Link to="/availableFoods"><button className="btn btn-primary font-montserrat text-lg text-white">See All Foods</button></Link>
                </div>
            </div>
            <div className="bg-base-200 py-16">
                <h1 className="font-pirata text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-center">Testimonials</h1>
                <div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                          }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        className="">
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center w-full mt-8">
                                <ImQuotesLeft className="text-3xl md:text-4xl lg:text-5xl"/>
                                <h3 className="text-2xl mt-4 mb-3 font-semibold">Alice Johnson</h3>
                                <p className="text-lg text-center">As a restaurant owner, this platform allows me to donate leftover food easily. <br /> It's great to know that the food is going to people who really need it.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center w-full mt-8">
                                <ImQuotesLeft className="text-3xl md:text-4xl lg:text-5xl"/>
                                <h3 className="text-2xl mt-4 mb-3 font-semibold">Sophia Martinez</h3>
                                <p className="text-lg text-center">This platform is fantastic! It's heartwarming to see how surplus food can be <br /> redirected to help those in need. Highly recommend it to everyone.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center w-full mt-8">
                                <ImQuotesLeft className="text-3xl md:text-4xl lg:text-5xl"/>
                                <h3 className="text-2xl mt-4 mb-3 font-semibold">Sophia Martinez</h3>
                                <p className="text-lg text-center">I've shared and received food through this platform, and the experience has <br /> been amazing every time.  It's a wonderful initiative that truly makes a difference.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="flex flex-col justify-center items-center w-full mt-8">
                                <ImQuotesLeft className="text-3xl md:text-4xl lg:text-5xl"/>
                                <h3 className="text-2xl mt-4 mb-3 font-semibold">Olivia Lee</h3>
                                <p className="text-lg text-center">This platform has made it so easy to connect with others and share food <br /> that would otherwise go to waste. It's a brilliant idea that's making a real impact.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Home;