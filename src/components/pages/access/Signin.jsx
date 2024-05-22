import { Helmet } from "react-helmet-async";
import { IoEyeOffSharp, IoEyeSharp, IoWarningOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
// import facebook from "../../../assets/icons/facebook.png";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { AuthContext } from "../../../provider/AuthProv";
// import Swal from 'sweetalert2';

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
                    handleUserInDatabase(res.user, "Email/password")
                    handleAlert();
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
                console.log("sign: ", res.user);
                if (res.user) {
                    handleUserInDatabase(res.user, "Google")
                    Swal.fire({
                        text: 'Login successful',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                console.log(result.isConfirmed)
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
                    handleUserInDatabase(res.user, "GitHub")
                    handleAlert();
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => { setError(error.message) });
    }

    const facebookLogin = () => {
        handleFacebookLogin()
            .then(res => {
                console.log(res.user)
                if (res.user) {
                    handleUserInDatabase(res.user, "Facebook");
                    handleAlert();
                }
                navigate(location?.state ? location.state : '/')
            })
            .catch((error) => { setError(error.message) });
    }

    const showSweetAlert = () => {

    }

    const handleAlert = async () => {
        await showSweetAlert();
    };

    const handleUserInDatabase = (user, loginMethod) => {
        fetch(`https://trip-tastic-server.vercel.app/findUser/${user.uid}`)
            .then(result => result.json())
            .then(datas => {
                if (datas === false) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                        name: user.displayName,
                        photoURL: user.photoURL,
                        emailVerified: user.emailVerified,
                        phoneNumber: user.phoneNumber,
                        isAnonymous: user.isAnonymous,
                        creationTime: user.metadata.creationTime,
                        lastSignInTime: user.metadata.lastSignInTime,
                        loginMethod: loginMethod
                    }
                    fetch('https://trip-tastic-server.vercel.app/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                        .then(result => result.json())
                        .then(data => {
                            console.log(data)
                        })
                }
                else {
                    const updateData = {
                        lastSignInTime: user.metadata.lastSignInTime
                    }
                    fetch(`https://trip-tastic-server.vercel.app/updateUser/${user.uid}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateData)
                    })
                        .then(result => result.json())
                        .then(data => {
                            console.log(data)
                        })
                }
            })
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
                <div className=" border p-2 md:p-5 shadow-lg rounded-lg bg-form_bg bg-center bg-contain bg-no-repeat mb-8 font-nunito">
                    <div className="mb-5">
                        <h2 className="text-2xl text-center mb-4 font-montserrat font-bold">Sign In</h2>
                        <form className="flex flex-col gap-5 font-mono" onSubmit={handleSubmit(onSubmit)} >
                            <div className="space-y-2">
                                <label>Email</label><br />
                                <input {...register('email')} type="email" className="md:text-lg lg:text-xl p-2 w-full focus:outline-none focus:border-b-[3px] border-[#058C42]" placeholder="Email" />
                                {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
                            </div>

                            <div className="space-y-2">
                                <label>Password</label><br />
                                <div className="flex bg-white items-center">
                                    <input {...register('password')} type={showPassword ? "text" : "password"} className="md:text-lg lg:text-xl  p-2 w-full focus:outline-none focus:border-b-[3px] border-[#058C42]" placeholder="Password" />
                                    <span className="text-xl pr-1">{showPassword ? <IoEyeOffSharp onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp onClick={() => setShowPassword(!showPassword)} />}</span>
                                </div>
                            </div>

                            {
                                errors.password && (<p className="text-red-500">{errors.password.message}</p>)
                            }
                            {
                                error && (<div className="flex justify-center items-center gap-1 text-red-500"><IoWarningOutline /><p className="text-lg">{error}</p></div>)
                            }

                            <Link className="text-lg text-center underline">Forgotten password</Link>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="submit" className="grow md:text-lg lg:text-xl font-semibold hover:cursor-pointer" value={isSubmitting ? "Loading..." : "Submit"} />
                            </label>
                        </form>
                        <p className="text-lg text-center font-mono my-3">Don`t have an account. <Link className=" text-blue-500 underline" to={"/sign-up"}>Create new</Link> </p>
                        <hr />
                        <div>
                            <h1 className="text-center text-xl font-semibold font-mono my-4">Sign in with</h1>
                            <div className="flex gap-5 text-3xl justify-center">
                                <button onClick={googleLogin}><FcGoogle /></button>
                                <button onClick={gitHubLogin}><BsGithub /></button>
                                <button onClick={facebookLogin}><img src={facebook} alt="" className="w-[32px]" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;