import { use, useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed_password, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        register({name:name, email:email, password:password, confirmed_password:confirmed_password}).then(res => {
            if(res.data.errors){
                setErrors(res.data.errors);
            } else {
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("isAuthenticated", true);
                navigate("/dashboard");
            }
        })
    }

    return (
        <>
        
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
            <h2 className="text-2x1 font-bold text-gray-800">Register</h2>
            {/* Display Errors */}
            {errors.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-80" role="alert">
                    <strong className="font-bold">Error(s):</strong>
                    <ul className="list-disc list-inside">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={submit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
                        type="text" value={name} onChange={(e) => setName(e.target.value)} 
                        name="name" placeholder="Enter your name" />

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        name="email" placeholder="Enter your email" />

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        name="password" placeholder="Enter your password" />

                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" 
                        type="password" value={confirmed_password} onChange={(e) => setConfirmPassword(e.target.value)} 
                        name="confirmed_password" placeholder="Enter your password" />

                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" type="submit">Register</button>
            </form> 
        </div>
        </>
    );
}
