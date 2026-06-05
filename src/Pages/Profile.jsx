import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import API from '../Services/api'
import MovieCard from '../Components/MovieCard'
import { FaUserCircle } from 'react-icons/fa'
import ProfileSkeleton from '../Components/skeletons/ProfileSkeleton'
import toast from 'react-hot-toast'

function Profile() {

    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true)
                setError("")

                const { data } = await API.get("/user")
                setProfile(data)
            } catch (error) {
                toast.error("Failed to load profile")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return (
        <div className="min-h-screen bg-[#14181c] text-white">
            <NavBar />

            {loading && <p className="text-gray-400"><ProfileSkeleton/></p>}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && profile && (
                <div className="max-w-6xl mx-auto px-8 py-10">
                    <div className="border-b border-gray-700 pb-8 mb-10">


                        <div className="flex justify-between gap-10 mt-8">

                            <div className='flex gap-2'>
                                <FaUserCircle className="text-gray-500 text-8xl" />
                                <div className='flex flex-col items-center justify-center'>
                                    <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
                                        Movie Diary Profile
                                    </p>
                                    <h1 className="text-4xl font-bold self-start">{profile.name}</h1>
                                    <p className="text-gray-400 mt-0.8 self-start">@{profile.name.toLowerCase()}</p>
                                </div>
                            </div>

                            <div className='flex gap-5 justify-center items-center mr-15'>
                                <div className='flex flex-col items-center'>
                                    <h2 className="text-3xl font-bold text-[#00c030]">
                                        {profile.diaryCount}
                                    </h2>
                                    <p className="text-gray-400 text-sm">Films logged</p>
                                </div>

                                <div className='flex flex-col items-center'>
                                    <h2 className="text-3xl font-bold text-[#00c030]">
                                        {profile.watchlistCount}
                                    </h2>
                                    <p className="text-gray-400 text-sm">Watchlist</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-300 border-b border-gray-700 pb-3 mb-5">
                        RECENT ACTIVITY
                    </h2>

                    {profile.recentEntries?.length === 0 ? (
                        <p className="text-gray-400">No recent activity yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                            {profile.recentEntries.map((entry) => (
                                <MovieCard key={entry.id} movie={entry} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div >);
}

export default Profile
