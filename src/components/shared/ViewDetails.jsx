import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProv";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const ViewDetails = () => {
    
    const food = useLoaderData();
    const {user} = useContext(AuthContext);
    const [dateAndTime, setTimeAndDate] = useState([]);
    const [time, setTime] = useState([]);
    const [date, setDate] = useState([]);
    const navigate = useNavigate();

    const {expiryDateTime} = food;

    const DateAndTime = new Date(expiryDateTime);
    const DAte = DateAndTime.toLocaleDateString();
    const Time = DateAndTime.toLocaleTimeString();
    
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));

        const foodId = food._id;
        const foodName = food.foodName;
        const foodQuantity = food.foodQuantity;
        const foodURL = food.foodImage;
        const donatorName = food.donatorName;
        const donatorEmail = food.donatorEmail;
        const requestId = user.uid;
        const requestEmail = user.email;
        const requestDate = date;
        const requestTime = time;
        const pickupLocation = food.pickupLocation;
        const expireDate = food.expiryDateTime;
        const note = data.note;

        const foodRequestData = {foodId, foodName, foodQuantity, foodURL, donatorName, donatorEmail, requestId, requestEmail, requestDate, requestTime, pickupLocation, expireDate, note}
        
        axios.post('http://localhost:3000/foodRequest', foodRequestData)
        .then(res => {
            if(res.data.insertedId){
                document.getElementById('my_modal_3').close()
                toast.success('Request Successful');
                const foodStatus ={ foodStatus: "unavailable" }
                axios.patch(`http://localhost:3000/food/updateStatus/${foodId}`, foodStatus);
                navigate('/myFoodRequest');
            }
        })
    }

    const setDateAndTime = () => {
        const currentTime = new Date();
        setTime(currentTime.toLocaleTimeString());
        setDate(currentTime.toLocaleDateString());
        setTimeAndDate(currentTime.toLocaleString());
        document.getElementById('my_modal_3').showModal();
    }

    return (
        <div>
            <div>
                <h1 className="font-pirata text-3xl md:text-4xl lg:text-5xl mt-20 mb-5">{food.foodName}</h1>
                <h4 className="font-montserrat md:text-lg"><span className="text-lg md:text-xl font-semibold"> Quantity:</span> {food.foodQuantity} person</h4>
                <h4 className="font-montserrat md:text-lg mt-2"><span className="text-lg md:text-xl font-semibold">Expired date: </span> {DAte}</h4>
                <h4 className="font-montserrat md:text-lg mt-2"><span className="text-lg md:text-xl font-semibold">Expired time: </span> {Time}</h4>
            </div>
            <div className="mt-10">
                <img src={food.foodImage} alt={food.foodName} className="w-full rounded-lg lg:h-[650px]" />
                <div className="flex justify-end">
                    <button onClick={()=> setDateAndTime()} className="btn btn-primary mt-5 font-montserrat btn-sm md:btn md:text-lg lg:text-xl">Request Food</button>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-3xl font-manrope">
                    <h3 className="font-bold text-2xl py-4 text-center">Food Request</h3>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-rows-6 gap-4">
                            <div className="flex justify-center gap-7">
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Food Name</legend>
                                    <input {...register('foodName')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.foodName}/>
                                </fieldset>
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Food Photo URL</legend>
                                    <input {...register('foodURL')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.foodImage}/>
                                </fieldset>
                            </div>
                            <div className="flex justify-center gap-7">
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Food Id</legend>
                                    <input {...register('foodId')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food._id}/>
                                </fieldset>
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Donator Name</legend>
                                    <input {...register('donatorName')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.donatorName}/>
                                </fieldset>
                            </div>
                            <div className="flex justify-center gap-7">
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Donator Email</legend>
                                    <input  {...register('donatorEmail')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.donatorEmail}/>
                                </fieldset>
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Your Email</legend>
                                    <input {...register('yourEmail')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={user.email}/>
                                </fieldset>
                            </div>
                            <div className="flex justify-center gap-7">
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Request Date</legend>
                                    <input {...register('requestDate')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={dateAndTime}/>
                                </fieldset>
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Pickup Location</legend>
                                    <input {...register('pickupLocation')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.pickupLocation}/>
                                </fieldset>
                            </div>
                            <div className="flex justify-center gap-7">
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Expire Date</legend>
                                    <input {...register('expireDate')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={food.expiryDateTime}/>

                                </fieldset>
                                <fieldset className="border-2 border-primary rounded w-80">
                                    <legend className="ml-4">Additional Note</legend>
                                    <input {...register('note')} type="text"  className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" defaultValue={food.additionalNotes}/>
                                </fieldset>
                            </div>
                            <div className="flex justify-center">
                                <input type="submit" value="Request" className="btn btn-primary text-lg font-montserrat"/>
                            </div>
                        </div>
                    </form>
                        <button onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
        </div>
    );
};

export default ViewDetails;