import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProv";

const MyFoodRequest = () => {

    const {user} = useContext(AuthContext);
    const [foodData, setFoodData] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/userRequestedFood/${user.uid}`)
        .then(res => {
            setFoodData(res.data);
        })
    },[])

    return (
        <div>
            <div className="overflow-x-auto lg:px-16 mt-10 md:mt-14 lg:mt-20 xl:mt-[100px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg font-montserrat text-heading">
                            <th>Photo</th>
                            <th>Food Name</th>
                            <th>Donar Name</th> 
                            <th>Pickup Location</th>
                            <th>Expire Date</th>
                            <th>Request Date</th>
                            <th>Request Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foodData?.map(food => <tr key={food._id}>
                                <th className="text-base"><img src={food.foodURL} alt={food.foodName} className="w-28 h-28 rounded-md" /></th>
                                <th>{food.foodName}</th>
                                <th>{food.donatorName}</th>
                                <th>{food.pickupLocation}</th>
                                <th>{food.expireDate}</th>
                                <th>{food.requestDate}</th>
                                <th>{food.requestTime}</th>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFoodRequest;