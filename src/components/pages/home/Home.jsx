import Banner from "../../header/Banner";
import img1 from '../../../assets/pic1.jpg'
import img2 from '../../../assets/thumb.jpg'
import FeaturedFoods from "./FeaturedFoods";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {

    const { data: foods } = useQuery({
        queryKey: ['foods'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/foods-home');
            return res.data;
        }
    })

    return (
        <div>
            <Banner></Banner>
            <div className="my-20 flex gap-5">
                <div className="flex items-center justify-center flex-col w-[50%]">
                    <p className="text-xl font-montserrat mb-4 font-semibold text-center">Food sharing <br /> & <br />Surplus Reduction Platform</p>
                    <h1 className="font-pirata text-7xl">Welcome to <span className="text-primary">EcoEats</span></h1>
                    <p className="text-lg mt-3 text-justify">Join us in our mission to reduce food waste and build a stronger community! Discover how you can share surplus food, connect with neighbors, and make a positive impact on the environment. Together, we can create a sustainable future and ensure everyone has access to nutritious meals.
                        <br /><br />
                        Explore, share, and support – welcome to <span className="text-primary font-semibold ">EcoEats!</span></p>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 w-[50%] gap-5">
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
                <div className="flex flex-wrap justify-between gap-10">
                    {
                        foods?.map(food => <FeaturedFoods
                            key={food.donatorId}
                            food={food}
                        ></FeaturedFoods>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;