import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProv";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageMyFood = () => {

    const { user } = useContext(AuthContext);
    const [selectedData, setSelectedData] = useState();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/manageUserFood/${user.uid}`)
        .then(res => {
            setFoodData(res.data)
        })
    },[])

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));

        const foodName = data.foodName;
        const foodImage = data.foodURL;
        const foodQuantity = data.foodQuantity;
        const pickupLocation = data.pickupLocation;
        const expiryDateTime = data.expireDate;
        const additionalNotes = data.note;
        const donatorId = selectedData.donatorId;
        const donatorImage = selectedData.donatorImage;
        const donatorName = selectedData.donatorName;
        const donatorEmail = selectedData.donatorEmail;
        const foodStatus = data.status;

        const updatedData = { foodName, foodImage, foodQuantity, pickupLocation, expiryDateTime, additionalNotes, donatorId, donatorImage, donatorName, donatorEmail, foodStatus }

        axios.put(`http://localhost:3000/updateFood/${selectedData._id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount === 1) {
                    document.getElementById('my_modal_3').close();
                    toast.success('Request Successful');
                    navigate('/myFoodRequest');
                }
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deleteFood/${id}`)
                    .then(data => {
                        if (data.data.deletedCount === 1) {
                            const remaining = foodData.filter(spot => spot._id !== id);
                            setFoodData(remaining);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire({
                                title: "Failed!",
                                text: "Something happened wrong. Unable to delete.",
                                icon: "error"
                            });
                        }
                    })
            }
        });
    }

    const updateData = (selected) => {
        setSelectedData(selected)
        document.getElementById('my_modal_3').showModal();
    }

    return (
        <div>
            <Helmet>
                <title>EcoEats || Manage My Foods</title>
            </Helmet>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foodData?.map(Food => <tr key={Food?._id}>
                                <th className="text-base"><img src={Food?.foodImage} alt={Food?.foodName} className="w-28 h-28 rounded-md" /></th>
                                <th>{Food?.foodName}</th>
                                <th>{Food?.donatorName}</th>
                                <th>{Food?.pickupLocation}</th>
                                <th>{Food?.expiryDateTime}</th>
                                <th className="space-y-2"><button onClick={() => updateData(Food)} className="btn w-full bg-primary mr-4 font-montserrat btn-primary md:text-white text-white hover:bg-primary btn-sm md:btn" >Update</button><button className="btn w-full btn-primary md:text-white font-montserrat text-white hover:bg-primary btn-sm md:btn" onClick={() => handleDelete(Food?._id)}>Delete</button></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-3xl font-manrope">
                    <h3 className="font-bold text-2xl py-4 text-center">Food Request</h3>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-rows-6 gap-4">
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Name</legend>
                                <input {...register('foodName', { required: "Food name is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food name" defaultValue = {selectedData?.foodName}/>
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Photo URL</legend>
                                <input {...register('foodURL', { required: "Food Photo URL is required" })} type="url" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food Photo URL" defaultValue = {selectedData?.foodImage}/>
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Food Quantity</legend>
                                <input {...register('foodQuantity', { required: "Food quantity is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Food Quantity" defaultValue = {selectedData?.foodQuantity}/>
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Pickup Location</legend>
                                <input {...register('pickupLocation', { required: "Pickup location is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Pickup Location" defaultValue = {selectedData?.pickupLocation}/>
                            </fieldset>

                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Expire Date</legend>
                                <input {...register('expireDate', { required: "Expire date and time is required" })} type="datetime-local" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Expire Date" defaultValue = {selectedData?.expiryDateTime}/>
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Additional Note</legend>
                                <input {...register('note')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Additional notes" defaultValue = {selectedData?.additionalNotes}/>
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Status</legend>
                                <input {...register('status', { required: "Food status is required" })} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Available or not"  defaultValue = {selectedData?.foodStatus}/>
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Name</legend>
                                <input {...register('donatorName')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" disabled defaultValue={selectedData?.donatorName} required />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap justify-center gap-7">
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Email</legend>
                                <input  {...register('donatorEmail')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" required disabled defaultValue={selectedData?.donatorEmail} />
                            </fieldset>
                            <fieldset className="border-2 border-primary rounded w-80">
                                <legend className="ml-4">Donar Photo URL</legend>
                                <input {...register('donarPhoto')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" required disabled defaultValue={selectedData?.donatorImage} />
                            </fieldset>
                        </div>
                        <div className="flex justify-center">
                            <input type="submit" value="Update Food" className="btn btn-primary md:text-lg font-montserrat btn-sm md:btn text-white md:text-white" />
                        </div>
                    </div>
                    </form>
                    <button onClick={() => document.getElementById('my_modal_3').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </div>
            </dialog>
        </div>
    );
};

export default ManageMyFood;