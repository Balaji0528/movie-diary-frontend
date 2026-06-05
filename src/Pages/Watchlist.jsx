import React, { useEffect, useState } from 'react'
import API from '../Services/api'
import NavBar from '../Components/NavBar'
import { Link } from 'react-router-dom'
import MovieCard from '../Components/MovieCard'
import MovieCardSkeleton from '../Components/skeletons/MovieCardSkeleton'
import toast from 'react-hot-toast'

function Watchlist() {
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedItem, setSelectedItem] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false)

    async function removeFromWatchlist() {

        try {
            await API.delete(`/watchlist/${selectedItem}`)
            setWatchlist((oldWatchlist) =>
                oldWatchlist.filter((item) => item.id !== selectedItem)
            )
            setShowConfirm(false)
            toast.success("Diary log removed")
        } catch (error) {
            toast.error("Diary log is not removed")
        }
    }

    useEffect(() => {
        async function getWatchlist() {
            try {
                setLoading(true)
                setError("")
                const res = await API.get(`/watchlist`)
                setWatchlist(res.data)
            } catch (error) {
                console.log(error.response?.status);
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false)
            }
        }

        getWatchlist()
    }, [])
    return (
        <div className="min-h-screen bg-[#14181c] text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    My Watchlist
                </h1>

                {loading && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                        {[...Array(6)].map((_, index) => (
                            <div key={index}>
                                <MovieCardSkeleton />

                                <div className="mt-3 h-9 bg-[#2c3440] rounded-md animate-pulse" />
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && watchlist.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center mt-24">
                        <h2 className="text-2xl font-bold mb-3">
                            Your watchlist is empty
                        </h2>

                        <p className="text-gray-400 mb-6 max-w-md">
                            Add movies you want to watch later.
                        </p>

                        <Link
                            to="/"
                            className="bg-[#00c030] px-5 py-3 rounded-md font-semibold hover:bg-[#00a82a] text-black"
                        >
                            Browse Movies
                        </Link>
                    </div>
                )}

                {!loading && !error && watchlist.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

                        {watchlist.map((item) => (
                            <div key={item.id} className="relative">

                                <MovieCard movie={item.movie} />

                                <button
                                    className="mt-3 w-full bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-semibold transition"
                                    onClick={() => {
                                        setSelectedItem(item.id)
                                        setShowConfirm(true)
                                    }}
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                    </div>
                )}

                {showConfirm && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                        <div className="bg-[#1c2228] border border-gray-700 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">

                            <h2 className="text-2xl font-bold mb-3">
                                Remove Movie
                            </h2>

                            <p className="text-gray-400 mb-6">
                                Are you sure you want to remove this movie from your watchlist?
                            </p>

                            <div className="flex justify-end gap-4">

                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-600 hover:border-white transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={removeFromWatchlist}
                                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default Watchlist