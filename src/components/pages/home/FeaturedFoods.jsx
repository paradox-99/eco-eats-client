import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const FeaturedFoods = ({ food }) => {

    const { expiryDateTime } = food;

    const dateAndTime = new Date(expiryDateTime);
    const date = dateAndTime.toLocaleDateString();
    const time = dateAndTime.toLocaleTimeString();

    return (
        <div>
            <div className="card card-compact rounded-md h-full max-w-[400px] bg-primary text-white shadow-xl hover:scale-105 duration-300">
                <div className='px-2 pb-2 pt-3 flex justify-between items-center text-lg font-semibold'>
                    <img src={food.donatorImage} alt={food.donatorName} className='w-12 h-12 rounded-full' />
                    <p>{food.donatorName}</p>
                </div>
                <figure><img src={food.foodImage} alt={food.foodName} className='md:h-[267px]' /></figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-semibold">{food.foodName}</h2>
                    <p className='text-lg'><span className='font-semibold'>Quantity:</span> {food.foodQuantity} person</p>
                    <p className='text-lg'><span className='font-semibold'>Pickup Location</span>: {food.pickupLocation}</p>
                    <p className='text-lg'><span className='font-semibold'>Expiry date:</span> {date}</p>
                    <p className='text-lg'><span className='font-semibold'>Expiry Time:</span> {time}</p>
                    <p className='text-lg'><span className='font-semibold'>Additional Notes:</span> {food.additionalNotes}</p>
                    <div className="card-actions justify-end">
                        <motion.div
                            className="box"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Link to={`/food/${food._id}`} className="btn font-montserrat text-base">Details</Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FeaturedFoods.propTypes = {
    food: PropTypes.object.isRequired
}

export default FeaturedFoods;