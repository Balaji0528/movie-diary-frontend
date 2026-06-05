import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaUserCircle } from "react-icons/fa";

function NavBar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token")

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav className="bg-[#050816] border-b border-gray-800 px-6 py-1.5 flex items-center justify-between">

            <Link
                to="/"
                className="flex items-center gap-3"
            >
                <img
                    src="/logo.png"
                    alt="MovieDiary Logo"
                    className="h-16 object-contain"
                />

                <h1 className="text-xl font-bold text-white tracking-wide">
                    MovieDiary
                </h1>
            </Link>

            <div className="flex items-center gap-7 text-gray-300">

                <Link
                    to="/"
                    className="hover:text-white transition duration-200"
                >
                    Movies
                </Link>

                <Link
                    to="/watchlist"
                    className="hover:text-white transition duration-200"
                >
                    Watchlist
                </Link>

                <Link
                    to="/diary"
                    className="hover:text-white transition duration-200"
                >
                    Diary
                </Link>
                
                <SearchBar />

                {token && (<Link
                    to="/profile"
                    className="hover:text-white transition duration-200"
                >
                    <FaUserCircle className="text-gray-500 text-4xl hover:text-white transition drop-shadow-[0_0_10px_rgba(0,192,48,0.2)]" />
                </Link>)}

                <button
                    onClick={token ? handleLogout : ()=>{navigate("/login")}}
                    className={`text-white px-4 py-1 rounded-md hover:cursor-pointer transition duration-200 font-medium ${token ? "bg-red-600 hover:bg-red-700" : "bg-[#00c030] hover:bg-[#02a72c]"}`}
                >
                    {token ? "Logout" : "Login"}
                </button>

            </div>
        </nav>
    );
}

export default NavBar;