import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../Services/api';
import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    )

    function handleChange(e) {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data);
            toast.success("Redirecting to Homepage")
            setTimeout(()=>{
                navigate('/')
            },400)
        } catch (error) {
            toast.error(`Invalid login credentials`)    
        }
    }

    return (
        <div className="min-h-screen bg-[#14181c] flex items-center justify-center px-4">

            <form action="" onSubmit={handleLogin} className='flex flex-col items-center justify-center' className="w-full max-w-md bg-[#1c2228] p-8 rounded-xl shadow-lg border border-gray-700">

                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    MovieDiary
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Sign in to continue
                </p>

                <label htmlFor="email"  className="text-gray-300 text-sm">Email</label>
                <input type="email" name='email' onChange={handleChange} value={formData.email} className="w-full mt-2 mb-5 px-4 py-3 rounded-md bg-[#2c3440] text-white border border-gray-600 outline-none focus:border-[#00c030]" placeholder='Enter your Email'/>

                <label htmlFor="password"  className="text-gray-300 text-sm">Password</label>
                <input type="password" name='password' onChange={handleChange} value={formData.password} className="w-full mt-2 mb-5 px-4 py-3 rounded-md bg-[#2c3440] text-white border border-gray-600 outline-none focus:border-[#00c030]" placeholder='Enter your Password' />

                <button className='border' className="w-full bg-[#00c030] text-white font-semibold py-3 rounded-md hover:bg-[#00a82a] transition">Login</button>
                <p className="text-gray-400 text-center mt-6">Don't have an Account ? <Link to="/register" className="text-[#40bcf4] hover:underline">Register</Link></p>
            </form>
        </div>
    )
}

export default Login