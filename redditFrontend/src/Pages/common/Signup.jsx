import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignUp } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setuserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const SignMutation = useMutation({
        mutationFn:() => SignUp(userData),
        onSuccess: () => {
            console.log('Successfully SignedIn');
            navigate('/login');
            
        },
        onError: () => {
            console.log('Unable to SignIn');
        }
    })

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserData(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmmit = (e) => {
        e.preventDefault();

        SignMutation.mutate();
        // console.log(userData);
    }

    return (
        <div className=" flex justify-center items-center h-screen">
            <div className=" bg-slate-300 rounded-2xl w-[300px] shadow-2xl hover:shadow-orange-400">
                <div className="grid bg-orange-500 p-3 text-2xl font-bold text-white rounded-t-2xl mb-3">
                    <p>SignUp</p>
                    <p className="text-sm justify-end flex">read_it.</p>
                </div>

                <div className="p-3">
                    <form onSubmit={handleSubmmit}>
                        <label className="">
                            <p className="font-bold mb-1">Email</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="enter email"
                                name="email"
                                value={userData.email}
                                type="email"
                                onChange={handleChange}
                            />
                        </label><br />
                        <label className="">
                            <p className="font-bold mb-1">Username</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="enter username"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                            />
                        </label><br />
                        <label className="relative">
                            <p className="font-bold mb-1">Password</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="enter password"
                                onChange={handleChange}
                                name="password"
                                value={userData.password}
                                type={showPassword ? "text" : "password"}
                            />
                            <button className="absolute mt-3 right-2" onClick={() => togglePasswordVisibility()}> {showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </label>
                        <label>
                            <p className="font-bold mb-1">Confirm Password</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="confirm password"
                                name="confirmPassword"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                            />
                        </label>

                        <div className="grid justify-center">
                            <button className="mx-auto flex bg-blue-500 px-10 py-2 rounded-lg font-semibold text-white" type="submit">SignUp</button>
                            <p className="flex mx-auto mt-2 text-gray-500">or</p>
                            <a className="flex mx-auto text-blue-900 underline" href="/login">Already have an account.</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;