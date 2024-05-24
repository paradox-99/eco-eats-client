import axios from "axios";
import { useEffect } from "react";

const MyFoodRequest = () => {

    useEffect(() => {
        axios.get('')
    },[])

    return (
        <div>
            <div className="overflow-x-auto lg:px-28 mt-10 md:mt-14 lg:mt-20 xl:mt-[100px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg font-montserrat text-heading">
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Location</th>
                            <th>Cost</th>
                            <th>Seasonality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            spots.map(spot => <tr key={spot._id}>
                                <th className="text-base"><img src={spot.photo_url} alt="" className="w-28 h-28 rounded-md" /></th>
                                <th>{spot.spot_name}</th>
                                <th>{spot.country}</th>
                                <th>{spot.spot_location}</th>
                                <th>{spot.cost}</th>
                                <th>{spot.seasonality}</th>
                                
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFoodRequest;