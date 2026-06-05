import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../Services/api";
import NavBar from "../Components/NavBar";
import MovieCard from "../Components/MovieCard";
import MovieCardSkeleton from "../Components/skeletons/MovieCardSkeleton";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const name = searchParams.get("name");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true)
        setError("")
        const { data } = await API.get(
          `/movies/search?name=${encodeURIComponent(name)}`
        );
        setMovies(data);
      } catch (error) {
        setError("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (name) fetchResults();
  }, [name]);

  return (
    <div className="min-h-screen bg-[#14181c] text-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-6">

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <h1 className="text-3xl font-bold mb-6">
          Search results for "{name}"
        </h1>

        {!loading && !error && movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center mt-24">
            <h2 className="text-2xl font-bold mb-3">No movies found</h2>

            <p className="text-gray-400 max-w-md">
              We couldn&apos;t find any movies matching your search. Try another title.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {movies.map((movie) => (
              <MovieCard key={movie.tmdbId} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;