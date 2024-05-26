import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProv";
import { useQuery } from "@tanstack/react-query";
import { Bars } from "react-loader-spinner";
import { Helmet } from "react-helmet-async";

const MyFoodRequest = () => {

    const { user, logOut } = useContext(AuthContext);

    const { isPending, isError, error, data: foodData } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/userRequestedFood/${user.uid}`, {withCredentials: true})
            .catch(err => {
                if(err.response.status === 401 || err.response.status === 403 )
                    logOut();
            })
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

    if(isError)
         return <p>{error.message}</p>

    return (
        <div>
            <Helmet>
                <title>EcoEats || My Food Request</title>
            </Helmet>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-10 text-center">Food requested by me</h1>
            <div className="overflow-x-auto lg:px-16 mt-4 md:mt-6 lg:mt-9 xl:mt-12">
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