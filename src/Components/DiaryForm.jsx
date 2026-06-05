import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../Services/api';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import NavBar from './NavBar';

function DiaryForm() {
    const { tmdbId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [watchedDate, setWatchedDate] = useState(new Date().toISOString().split("T")[0])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchMovie() {
            try {
                setLoading(true)
                setError("")
                const resp = await API.get(`/movies/${tmdbId}`)
                setMovie(resp.data)
            } catch (error) {
                setError("Cant able to add movie to diary")
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [tmdbId])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const diaryData = {
                tmdbId: movie.tmdbId,
                title: movie.title,
                review: review,
                rating: rating,
                watchedDate: watchedDate
            }

            console.log(diaryData);


            await API.post("/diary", diaryData)

            toast.success("Movie added to your diary")
            navigate("/diary")
        } catch (error) {
            toast.error(`Failed to add`)
            console.log(error);

        }
    }

    function handleRating(star, e) {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - left

        if (clickX < width / 2) {
            setRating(star - 0.5)
        } else {
            setRating(star)
        }
    }

    function renderStar(star) {
        if (star <= rating) {
            return <FaStar />
        }

        else if (star - 0.5 === rating) {
            return <FaStarHalfAlt />
        }

        else {
            return <FaRegStar />
        }
    }

    return (
        <div className="min-h-screen bg-[#14181c] text-white">
            <NavBar/>

            {loading && (
                <div className="max-w-5xl mx-auto px-6 py-10">
                    <p className="text-gray-400">
                        Loading movie...
                    </p>
                </div>
            )}

            {!loading && error && (
                <div className="max-w-5xl mx-auto px-6 py-10">
                    <p className="text-red-500">
                        {error}
                    </p>
                </div>
            )}

            {!loading && !error && movie && (
                <div className="max-w-5xl mx-auto px-6 py-10">

                    <h1 className="text-3xl font-bold mb-8">
                        Add Diary Entry
                    </h1>

                    <div className="bg-[#1c2228] border border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-lg">

                        <div className="flex justify-center md:block">

                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/300x450?text=No+Image";
                                }}
                                className="w-44 md:w-56 aspect-2/3 object-cover rounded-xl border border-gray-700 shadow-md"
                            />

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex-1"
                        >

                            <h2 className="text-3xl font-bold mb-1">
                                {movie.title}
                            </h2>

                            <p className="text-gray-400 mb-8">
                                {movie.releaseDate}
                            </p>

                            <label className="block text-gray-300 font-medium mb-3">
                                Rating
                            </label>

                            <div className="flex items-center gap-2 text-[#00c030] mb-8">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={(e) => handleRating(star, e)}
                                        className="text-4xl hover:scale-110 transition cursor-pointer"
                                    >
                                        {renderStar(star)}
                                    </button>
                                ))}

                                <span className="ml-4 text-gray-300 text-lg">
                                    {rating > 0
                                        ? `${rating}/5`
                                        : "No rating"}
                                </span>

                            </div>

                            <label className="block text-gray-300 font-medium mb-3">
                                Watched Date
                            </label>

                            <input
                                type="date"
                                value={watchedDate}
                                onChange={(e) => setWatchedDate(e.target.value)}
                                className="w-full bg-[#2c3440] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00c030] transition mb-8"
                            />

                            <label className="block text-gray-300 font-medium mb-3">
                                Review
                            </label>

                            <textarea
                                rows="7"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your thoughts about this movie..."
                                className="w-full bg-[#2c3440] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none resize-none focus:border-[#00c030] transition"
                            />

                            <div className="flex flex-wrap gap-4 mt-6">

                                <button
                                    type="submit"
                                    className="bg-[#00c030] hover:bg-[#00a82a] text-black px-6 py-3 rounded-md font-semibold transition"
                                >
                                    Save Diary
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="bg-[#2c3440] hover:bg-[#38414d] px-6 py-3 rounded-md font-semibold transition"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}
        </div>
    )
}

export default DiaryForm