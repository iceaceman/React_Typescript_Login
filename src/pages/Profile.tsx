import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile } from "../services/authService";


export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmed_password, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        profile({name:name, email:email, password:password, confirmed_password:confirmed_password}, user.token).then(res => {
            if(res.data.errors){
                setErrors(res.data.errors);
            } else {
                localStorage.setItem("user", JSON.stringify({
                    ...user,
                    name: res.data.name, 
                    email: res.data,email
                }));
                
                navigate("/dashboard");
            }
        })
    }

    return (
      <>
        <div className="bg-gray-100 min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md h-full">
            <div className="p-6">
              <h1 className="text-2x1 font-bold text-graye-800">React App</h1>
            </div>
            <nav className="mt-10">
              <Link to="/dashboard"
                className="block py-2.5 px-6 bg-blue-500 text-white font-semibold rounded-r-full m-2">
                Dashboard
              </Link>
              <Link to="/profile"
                className="block py-2.5 px-6 bg-blue-500 text-white font-semibold rounded-r-full m-2">
                Profile
              </Link>
             
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-10">
            <div className="mb-6">
              <h2 className="text-3x1 font-bold text-gray-800">Hi {user.name}, Welcome Back!</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-4x1 font-extrabold text-blue-600">Profile</h3>
              <p className="mt-2 text-gray-600">Here is your Profile overview.</p>
              <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">  
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
            </div>
          </main>    
        </div>            
      </>
    );
}
