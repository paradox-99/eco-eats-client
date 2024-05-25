import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProv";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddFood = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const foodName = data.foodName;
        const foodImage = data.foodURL;
        const foodQuantity = data.foodQuantity;
        const pickupLocation = data.pickupLocation;
        const expiryDateTime = data.expireDate;
        const additionalNotes = data.note;
        const donatorId = user.uid;
        const donatorImage = user.photoURL;
        const donatorName = user.displayName;
        const donatorEmail = user.email;
        const foodStatus = data.status;

        const insertedData = { foodName, foodImage, foodQuantity, pickupLocation, expiryDateTime, additionalNotes, donatorId, donatorImage, donatorName, donatorEmail, foodStatus }

        axios.post('http://localhost:3000/addNewFood', insertedData)
        .then(res => {
            if(res.data.insertedId)
                toast.success('Food added successfully.')
        })
    }

    return (
        <div className="my-14">
            <Helmet>
                <title>EcoEats || Add Food</title>
            </Helmet>
            <div className="text-center ">
                <h1 className="font-pirata text-5xl">Add new Food</h1>
                <p className="text-2xl mt-4">Use this form to add a new food item to our community platform.</p>
            </div>
            <div className="mt-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-rows-6 gap-4">
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Name</legend>
                                <input {...register('foodName', { required: "Food name is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food name" />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Photo URL</legend>
                                <input {...register('foodURL', { required: "Food Photo URL is required" })} type="url" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food Photo URL" />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Quantity</legend>
                                <input {...register('foodQuantity', { required: "Food quantity is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food Quantity" />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Pickup Location</legend>
                                <input {...register('pickupLocation', { required: "Pickup location is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Pickup Location" />
                            </fieldset>

                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Expire Date</legend>
                                <input {...register('expireDate', { required: "Expire date and time is required" })} type="datetime-local" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Expire Date" />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Additional Note</legend>
                                <input {...register('note')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Additional notes" />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Status</legend>
                                <input {...register('status', { required: "Food status is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Available or not" defaultValue="Available" />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Name</legend>
                                <input {...register('donatorName')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={user.displayName} required />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Email</legend>
                                <input  {...register('donatorEmail')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" required disabled defaultValue={user.email} />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Photo URL</legend>
                                <input {...register('donarPhoto')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" required disabled defaultValue={user.photoURL} />
                            </fieldset>
                        </div>
                        {
                            (errors.foodName && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.foodName.message}</p>) ||
                            (errors.foodURL && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.foodURL.message}</p>) ||
                            (errors.foodQuantity && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.foodQuantity.message}</p>) ||
                            (errors.status && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.status.message}</p>) ||
                            (errors.pickupLocation && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.pickupLocation.message} </p>) ||
                            (errors.expireDate && <p className="text-red-600 font-semibold text-lg text-center font-manrope">{errors.expireDate.message}</p>)
                        }

                        <div className="flex justify-center">
                            <input type="submit" value="Add Food" className="btn btn-sm md:btn text-white md:text-white btn-primary md:flex-wraptext-lg font-montserrat" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;