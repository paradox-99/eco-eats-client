import { Helmet } from "react-helmet-async";
import { IoEyeOffSharp, IoEyeSharp, IoWarningOutline } from "react-icons/io5";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { AuthContext } from "../../../provider/AuthProv";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'
import { FaUserEdit } from "react-icons/fa";

const schema = z.object({
    userName: z.string(),
    photoURL: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
    terms: z.boolean(),
});

const Signup = () => {

    const { handleCreateUser } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        setError('');
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
        const name = data.userName;
        const url = data.photoURL;
        const email = data.email;
        const password = data.password;
        const terms = data.terms;
        let URL = '';

        if (url === '')
            URL = 'https://i.ibb.co/DDccd18/cowboy-6543190.png'
        else
            URL = url

        if (!terms) {
            setError('Accept the terms and conditions')
            return;
        }

        handleCreateUser(email, password)
            .then(res => {
                updateProfile(res.user, { displayName: name, photoURL: URL })
                    .then(handleAlert())
                    .catch(err => setError(err.message))
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).')
                    setError('Email is already in use!')
            });
    };

    const showSweetAlert = () => {
        return Swal.fire({
            text: 'Registration successful',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    const handleAlert = async () => {
        await showSweetAlert();
        navigate('/signin');
    };

    return (
        <div>
            <Helmet>
                <title>Sign up</title>
            </Helmet>
            <div className="flex justify-center mt-10 ">
                <div className="w-[420px] border border-primary p-2 md:p-5 mb-8 shadow-lg rounded-lg bg-form_bg bg-center bg-contain bg-no-repeat font-nunito">
                    <div className="mb-5">
                    <div className="flex justify-center">
                            <div className="flex justify-center w-fit p-4 rounded-full text-white text-3xl bg-[#ff421c]">
                                <FaUserEdit />
                            </div>
                        </div>
                        <h2 className="text-2xl text-center mb-4 font-bold mt-3">Sign up</h2>
                        <form className="flex flex-col gap-5 font-mono" onSubmit={handleSubmit(onSubmit)} >
                            {/* user name */}
                            <fieldset className="border-2 border-primary rounded">
                                <legend className="text-center">Full Name</legend>
                                <input {...register('userName')} type="text" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none" placeholder="Full name" />
                            </fieldset>
                            {errors.userName && (<p className="text-red-500">{errors.userName.message}</p>)}

                            {/* photo url */}
                            <fieldset className="border-2 border-primary rounded">
                                <legend className="text-center">Photo URL</legend>
                                <input {...register('photoURL')} type="url" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none" placeholder="Photo URL" />
                            </fieldset>
                            {errors.photoURL && (<p className="text-red-500">{errors.photoURL.message}</p>)}

                            {/* email */}
                            <fieldset className="border-2 border-primary rounded">
                                <legend className="text-center">Email</legend>
                                <input {...register('email')} type="email" className=" md:text-lg lg:text-xl p-2 w-full focus:outline-none" placeholder="Email" />
                            </fieldset>
                            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                            {/* password */}
                            <fieldset className="border-2 border-primary rounded">
                                <legend className="text-center">Password</legend>
                                <div className="flex items-center bg-white">
                                    <input {...register('password')} type={showPassword ? "text" : "password"} className="md:text-lg lg:text-xl p-2 w-full focus:outline-none" placeholder="Password" />
                                    <span className="text-xl pr-1">{showPassword ? <IoEyeOffSharp onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp onClick={() => setShowPassword(!showPassword)} />}</span>
                                </div>
                            </fieldset>
                                {errors.password && (<p className="text-red-500">{errors.password.message}</p>)}

                            {
                                error && (<div className="flex justify-center items-center gap-1 text-red-500"><IoWarningOutline /><p className="text-lg">{error}</p></div>)
                            }
                            <label className="flex justify-center items-center gap-2">
                                <input {...register('terms')} type="checkbox" />
                                Accept our terms and conditions.
                            </label>
                            {errors.conditions && (<p className="text-red-500">{errors.conditions.message}</p>)}
                            <label className="input input-bordered border-primary flex items-center gap-2">
                                <input type="submit" className="grow md:text-lg lg:text-xl font-semibold hover:cursor-pointer" defaultValue={isSubmitting ? "Loading..." : "Submit"} />
                            </label>
                        </form>
                        <p className="text-lg text-center font-mono my-3">Already have an account. <Link className=" text-blue-500 underline" to={"/signin"}>Sign in</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;