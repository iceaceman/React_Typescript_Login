import { Link, useNavigate } from "react-router-dom";


export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    console.log(user);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";

        navigate("/login");
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
               <a onClick={logout}
                className="block py-2.5 px-6 bg-blue-500 text-white font-semibold rounded-r-full m-2">
                Logout
              </a>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-10">
            <div className="mb-6">
              <h2 className="text-3x1 font-bold text-gray-800">Hi {user.name}, Welcome Back!</h2>
            </div>
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-4x1 font-extrabold text-blue-600">Dashboard</h3>
              <p className="mt-2 text-gray-600">Here is your dashboard overview.</p>
            </div>
          </main>    
        </div>            
      </>
    );
}
