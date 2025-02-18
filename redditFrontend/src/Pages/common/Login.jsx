import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LogIn } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setuserData] = useState({
        email: '',
        password: '',
    });

    const LoginMutation = useMutation({
        mutationFn: () => LogIn(userData),
        onSuccess: (data) => {
            console.log('LoggedIn Successfully!');
            window.localStorage.setItem('userData', JSON.stringify(data.data));
            navigate('/');
            window.location.reload();
        },
        onError: () => {
            console.log('Unable to Login!');
        },
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

    const handleSubmit = (e) => {
        e.preventDefault();

        LoginMutation.mutate();
         console.log(userData);
    }

    return (
        <div className=" flex justify-center items-center h-screen">
            <div className=" bg-slate-300 rounded-2xl w-[300px] shadow-2xl hover:shadow-orange-400">
                <div className="grid bg-orange-500 p-3 text-2xl font-bold text-white rounded-t-2xl mb-3">
                    <p>LogIn</p>
                    <p className="text-sm justify-end flex">read_it.</p>
                </div>

                <div className="p-3">
                    <form onSubmit={handleSubmit}>
                        <label className="">
                            <p className="font-bold mb-1">Email</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="enter username"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                type="email"
                            />
                        </label><br />
                        <label className="relative">
                            <p className="font-bold mb-1">Password</p>
                            <input className="p-2 w-full bg-transparent border-[1px] text-gray-700 border-gray-500 rounded-lg mb-5 text-sm"
                                placeholder="enter password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                            />
                            <button className="absolute mt-3 right-2" onClick={() => togglePasswordVisibility()}> {showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                        </label>

                        <div className="grid justify-center">
                            <button className="mx-auto flex bg-blue-500 px-10 py-2 rounded-lg font-semibold text-white" type="submit">LogIn</button>
                            <p className="flex mx-auto mt-2 text-gray-500">or</p>
                            <a className="flex mx-auto text-blue-900 underline" href="/signup">create an account.</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;