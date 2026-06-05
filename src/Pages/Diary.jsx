import React, { useEffect, useState } from "react";
import API from "../Services/api";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import DiarySkeleton from "../Components/skeletons/DiarySkeleton";
import toast from "react-hot-toast";

function Diary() {
    const [diary, setDiary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);
    const [showConfirm,setShowConfirm] = useState(false);
    const [selectedItem,setSelectedItem] = useState(null)

    useEffect(() => {
        async function getDiary() {
            try {
                setLoading(true)
                setError("")
                const resp = await API.get("/diary");
                setDiary(resp.data);
            } catch (error) {
                toast.error("Failed to load")
            } finally {
                setLoading(false)
            }
        }

        getDiary();
    }, []);

    async function deleteDiary() {
        try {
            await API.delete(`/diary/${selectedItem}`)

            setDiary((oldDiary) => oldDiary.filter((entry) => entry.id !== selectedItem))

            setShowConfirm(false)

            toast.success("Diary Log removed")
        } catch (error) {
            toast.error("Failed to delete")
        }
    }

    function renderStars(rating) {
        const fullStars = Math.floor(rating)
        const halfStar = rating % 1 !== 0

        return (
            <>
                {"★".repeat(fullStars)}
                {halfStar && "½"}
            </>
        )
    }

    const groupedDiary = {}

    diary.forEach(entry => {
        const date = new Date(entry.watchedDate)

        const monthYear = date.toLocaleDateString("en-us", {
            month: "long",
            year: "numeric"
        })

        if (!groupedDiary[monthYear]) {
            groupedDiary[monthYear] = []
        }

        groupedDiary[monthYear].push(entry)
    });

    return (
        <div className="min-h-screen bg-[#14181c] text-white">
            <NavBar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Diary
                </h1>

                {loading && (
                    <p className="text-gray-400">
                        <DiarySkeleton />
                    </p>
                )}

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                {!loading && !error && diary.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center mt-24">
                        <h2 className="text-2xl font-bold mb-3">
                            Your Diary is empty
                        </h2>

                        <p className="text-gray-400 mb-6 max-w-md">
                            You haven&apos;t added any watched movies yet.
                        </p>

                        <Link
                            to="/"
                            className="bg-[#00c030] px-5 py-3 rounded-md font-semibold hover:bg-[#00a82a]"
                        >
                            Add a movie
                        </Link>
                    </div>
                )}

                {!loading && !error && diary.length > 0 && (
                    <div className="overflow-x-auto scrollbar-hide">

                        <div className="min-w-250">

                            <div className="grid grid-cols-10 gap-4 text-gray-400 text-sm border-b border-gray-700 pb-3 mb-4 items-center">
                                <p className="col-span-1 text-center">DAY</p>
                                <p className="col-span-4">FILM</p>
                                <p className="col-span-2 text-center">RELEASED</p>
                                <p className="col-span-1 text-center">RATING</p>
                                <p className="col-span-1 text-center">REVIEW</p>
                                <p className="col-span-1 text-center">EDIT</p>
                            </div>

                            {Object.entries(groupedDiary).map(([monthGroup, entries]) => (
                                <div key={monthGroup} className="mb-10">

                                    <h2 className="text-xl font-bold text-gray-300 border-b border-gray-700 pb-3 mb-3">
                                        {monthGroup.toUpperCase()}
                                    </h2>

                                    {entries.map((entry) => {

                                        const date = new Date(entry.watchedDate);

                                        const day = date.toLocaleDateString("en-us", {
                                            day: "2-digit"
                                        });

                                        return (
                                            <div
                                                key={entry.id}
                                                className="grid grid-cols-10 gap-4 items-center border-b border-gray-800 py-8 hover:bg-[#1c2228] transition"
                                            >

                                                <div className="col-span-1 justify-self-center text-4xl text-gray-300 font-light">
                                                    {day}
                                                </div>

                                                <div className="col-span-4 flex items-center gap-4">

                                                    <img
                                                        src={entry.posterUrl}
                                                        alt={entry.title}
                                                        className="w-14 h-20 object-cover rounded"
                                                    />

                                                    <div>
                                                        <h2 className="font-bold">
                                                            {entry.title}
                                                        </h2>
                                                    </div>

                                                </div>

                                                <p className="col-span-2 justify-self-center text-gray-300">
                                                    {entry.releaseDate}
                                                </p>

                                                <p className="col-span-1 justify-self-center text-[#00c030] text-xl">
                                                    {renderStars(entry.rating)}
                                                </p>

                                                <button
                                                    className="col-span-1 justify-self-center text-gray-300 hover:text-white"
                                                    onClick={() => {
                                                        setSelectedReview(entry)
                                                    }}
                                                >
                                                    Review
                                                </button>

                                                <button
                                                    className="col-span-1 justify-self-center text-red-500 hover:text-red-400"
                                                    onClick={() => {
                                                        setSelectedItem(entry.id)
                                                        setShowConfirm(true)
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        )
                                    })}
                                </div>
                            ))}

                        </div>

                    </div>
                )}

                {selectedReview && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
                        onClick={() => setSelectedReview(null)}
                    >
                        <div
                            className="bg-[#1c2228] border border-gray-700 rounded-lg max-w-2xl w-full p-6"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="flex gap-5">

                                <img
                                    src={selectedReview.posterUrl}
                                    alt={selectedReview.title}
                                    className="w-24 h-36 object-cover rounded border border-gray-700"
                                />

                                <div className="flex-1">

                                    <h2 className="text-2xl font-bold">
                                        {selectedReview.title}
                                    </h2>

                                    <div className="flex items-center gap-3 mt-2">

                                        <p className="text-[#00c030] text-xl">
                                            {renderStars(selectedReview.rating)}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Watched on {selectedReview.watchedDate}
                                        </p>

                                    </div>

                                    <p className="text-gray-300 mt-5 leading-7 border-t border-gray-700 pt-4">
                                        {selectedReview.review || "No review written."}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => setSelectedReview(null)}
                                className="mt-6 text-gray-400 hover:text-white text-sm"
                            >
                                Close
                            </button>

                        </div>
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
                                    onClick={deleteDiary}
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

export default Diary;