import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../Services/api";
import NavBar from "../components/NavBar";
import MovieDetailsSkeleton from "../Components/skeletons/MovieDetailsSkeleton";
import toast from "react-hot-toast";

function MovieDetails() {
    const { tmdbId } = useParams();
    const navigate = useNavigate()

    const [movie, setMovie] = useState(null);
    const [added, setAdded] = useState(false);
    const [watchlistId, setWatchlistId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showConfirm, setShowConfirm] = useState(false)

    const token = localStorage.getItem("token")

    useEffect(() => {
        async function fetchMovieAndCheck() {
            try {
                setLoading(true);
                setError("");

                const movieResp = await API.get(`/movies/${tmdbId}`);
                setMovie(movieResp.data);
            } catch (error) {
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }

            if (token) {
                try {
                    const checkResp = await API.get(`/watchlist/movie/${tmdbId}`);
                    setAdded(checkResp.data.exists);
                    setWatchlistId(checkResp.data.watchlistId);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchMovieAndCheck();
    }, [tmdbId]);

    async function addToWatchlist() {
        try {
            if (!token) {
                navigate("/login")
                return;
            }
            const res = await API.post("/watchlist", movie);
            setAdded(true);
            setWatchlistId(res.data.id);
            toast.success("Added to Watchlist")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    async function removeFromWatchlist() {
        try {
            if (!token) {
                navigate("/login")
                return;
            }
            await API.delete(`/watchlist/${watchlistId}`);
            setWatchlistId(null);
            setAdded(false);
            setShowConfirm(false)
            toast.success("Removed from Watchlist")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    function getLanguageName(code) {
        const languages = {
            en: "English",
            ta: "Tamil",
            hi: "Hindi",
            ja: "Japanese",
            ko: "Korean",
            te: "Telugu",
            ml: "Malayalam",
        };

        return languages[code] || code?.toUpperCase();
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#14181c] text-white">
                <NavBar />

                <MovieDetailsSkeleton />
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#14181c] text-white">
                <NavBar />

                <div className="max-w-7xl mx-auto px-8 py-10">
                    <p className="text-red-500">{error || "Movie not found."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#14181c] text-white">
            <NavBar />

            <div className="relative min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: `url(${movie.backDropUrl})`,
                    }}
                />

                <div className="absolute inset-0 bg-linear-to-r from-[#14181c] via-[#14181c]/80 to-[#14181c]/30" />
                <div className="absolute inset-0 bg-linear-to-t from-[#14181c] via-transparent to-black/40" />

                <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://placehold.co/300x450?text=No+Image";
                            }}
                            className="w-64 rounded-lg border border-gray-700 shadow-2xl"
                        />

                        <div className="max-w-4xl">
                            <h1 className="text-5xl font-bold mb-3">{movie.title}</h1>

                            <p className="text-gray-400 text-lg">
                                {movie.releaseDate?.split("-")[0]} •{" "}
                                {getLanguageName(movie.originalLanguage)}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-300">
                                <span className="bg-[#00c030] text-black px-3 py-1 rounded-full font-bold">
                                    ★ {movie.voteAverage?.toFixed(1) || "N/A"}
                                </span>

                                <span>{movie.voteCount?.toLocaleString() || 0} votes</span>
                            </div>

                            {movie.overview && (
                                <div className="mt-10 max-w-3xl">
                                    <h2 className="text-2xl font-bold mb-4 tracking-wide">
                                        Overview
                                    </h2>

                                    <p className="text-gray-300 leading-8 text-lg line-clamp-4">
                                        {movie.overview}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4 mt-10">
                                <button
                                    className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${added
                                        ? "bg-gray-700 hover:bg-gray-600"
                                        : "bg-[#00c030] hover:bg-[#00a82a] text-black"
                                        }`}
                                    onClick={() => {
                                        added ? setShowConfirm(true) : addToWatchlist();
                                    }}
                                >
                                    {added ? "✓ In Watchlist" : "+ Add to Watchlist"}
                                </button>

                                <Link
                                    className="bg-white/10 backdrop-blur-md border border-gray-600 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition duration-300"
                                    to={`/add-diary/${movie.tmdbId}`}
                                >
                                    Log/Review
                                </Link>
                            </div>

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
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;