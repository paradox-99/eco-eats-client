import { Helmet } from "react-helmet-async";
import { IoEyeOffSharp, IoEyeSharp, IoWarningOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import facebook from "../../../assets/Facebook_2.png";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { AuthContext } from "../../../provider/AuthProv";
import Swal from 'sweetalert2';
import { VscSignIn } from "react-icons/vsc";

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const Signin = () => {
    const { handleEmailLogin, logOut, handleGoogleLogin, handleGitHubLogin, handleFacebookLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        setError('');
        await new Promise(resolve => setTimeout(() => resolve(), 1000));

        const email = data.email;
        const password = data.password;

        handleEmailLogin(email, password)
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        text: 'Login successful',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate(location?.state ? location.state : '/')
                            }
                        });
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/invalid-credential).')
                    setError('Invalid email or password!')
            });
    }

    const googleLogin = () => {
        handleGoogleLogin()
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        text: 'Login successful',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate(location?.state ? location.state : '/')
                            }
                        });
                }
            })
            .catch((error) => { setError(error.message) });
    }

    const gitHubLogin = () => {
        handleGitHubLogin()
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        text: 'Login successful',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate(location?.state ? location.state : '/')
                            }
                        });
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => { setError(error.message) });
    }

    const facebookLogin = () => {
        handleFacebookLogin()
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        text: 'Login successful',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate(location?.state ? location.state : '/')
                            }
                        });
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => { setError(error.message) });
    }

    useEffect(() => {
        logOut();
    }, [])

    return (
        <div>
            <Helmet>
                <title>Sign in</title>
            </Helmet>
            <div className="flex justify-center mt-10">
                <div className=" border border-primary p-2 md:p-5 shadow-lg rounded-lg mb-8 font-nunito">
                    <div className="mb-5">
                        <div className="flex justify-center">
                            <div className="flex justify-center w-fit p-3 rounded-full text-white text-4xl bg-[#ff421c]">
                                <VscSignIn />
                            </div>
                        </div>
                        <h2 className="text-2xl text-center mb-4 font-bold mt-5">Sign In</h2>
                        <form className="flex flex-col gap-5 font-mono" onSubmit={handleSubmit(onSubmit)} >

                            <fieldset className="border-2 border-primary rounded">
                                <legend className="ml-3">Email</legend>
                                <input {...register('email')} type="email" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none bg-inherit" placeholder="Email" />
                            </fieldset>
                            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}

                            <fieldset className="border-2 border-primary rounded">
                                <legend className="ml-3">Password</legend>
                                <div className="flex items-center">
                                    <input {...register('password')} type={showPassword ? "text" : "password"} className="md:text-lg lg:text-xl  p-2 w-full focus:outline-none bg-inherit" placeholder="Password" />
                                    <span className="text-xl pr-1">{showPassword ? <IoEyeOffSharp onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp onClick={() => setShowPassword(!showPassword)} />}</span>
                                </div>
                            </fieldset>


                            {
                                errors.password && (<p className="text-red-500">{errors.password.message}</p>)
                            }
                            {
                                error && (<div className="flex justify-center items-center gap-1 text-red-500"><IoWarningOutline /><p className="text-lg">{error}</p></div>)
                            }

                            <Link className="text-lg text-center underline">Forgotten password</Link>
                            <label className="input input-bordered border-primary flex items-center gap-2">
                                <input type="submit" className="grow md:text-lg lg:text-xl font-semibold hover:cursor-pointer focus:outline-none" defaultValue={isSubmitting ? "Loading..." : "Submit"} />
                            </label>
                        </form>
                        <p className="text-lg text-center font-mono my-3">Don`t have an account. <Link className=" text-blue-500 underline" to={"/signup"}>Create new</Link> </p>
                        <hr />
                        <div>
                            <h1 className="text-center text-xl font-semibold font-mono my-4">Sign in with</h1>
                            <div className="gap-5 text-3xl place-content-center grid grid-cols-2 grid-rows-2">
                                <div className="shadow-lg bg-base-100 flex justify-center">
                                    <button onClick={googleLogin} className="flex items-center gap-2 font-manrope font-semibold p-3"><FcGoogle /><p className="text-xl">Google</p></button>
                                </div>
                                <div className="shadow-lg bg-base-100 flex justify-center">
                                    <button onClick={gitHubLogin} className="flex items-center gap-2 font-manrope font-semibold p-3"><BsGithub /><p className="text-xl">GitHub</p></button>
                                </div>
                                <div className="w-1/2 self-center shadow-xl place-self-center col-span-2 ">
                                    <button onClick={facebookLogin} className="flex items-center gap-2 font-manrope font-semibold p-3"><img src={facebook} alt="" className="h-8" /><p className="text-xl">Facebook</p></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;