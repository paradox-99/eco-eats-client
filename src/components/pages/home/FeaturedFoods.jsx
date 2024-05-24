import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeaturedFoods = ({ food }) => {
    // console.log(food);
    return (
        <div>
            <div className="card card-compact rounded-md w-[400px] bg-primary text-white shadow-xl">
                <div className='px-2 pb-2 pt-3 flex justify-between items-center text-lg font-semibold'>
                    <img src={food.donatorImage} alt={food.donatorName}  className='w-12 h-12 rounded-full'/>
                    <p>{food.donatorName}</p>
                </div>
                <figure><img src={food.foodImage} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-xl font-semibold">{food.foodName}</h2>
                    <p className='text-lg'><span className='font-semibold'>Quantity:</span> {food.foodQuantity} person</p>
                    <p className='text-lg'><span className='font-semibold'>Pickup Location</span>: {food.pickupLocation}</p>
                    <p className='text-lg'><span className='font-semibold'>Expired:</span> {food.expiryDateTime}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/food/${food._id}`} className="btn font-montserrat text-base">Details</Link>
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