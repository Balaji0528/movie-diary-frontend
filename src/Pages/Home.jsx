import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import API from "../Services/api";
import MovieCard from "../Components/MovieCard";
import HeroSection from "../Components/HeroSection";
import HeroSectionSkeleton from "../Components/skeletons/HeroSectionSkeleton";
import MovieCardSkeleton from "../Components/skeletons/MovieCardSkeleton";

function Home() {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token")
  useEffect(() => {

    async function fetchMovies() {
      try {
        setLoading(true)
        setError("")
        const popularResp = await API.get("/movies/popular");
        setPopularMovies(popularResp.data)

        const trendingResp = await API.get("/movies/trending");
        const filteredTrending = trendingResp.data.filter(
          (trendingMovie) =>
            !popularResp.data.some(
              (popularMovie) => popularMovie.tmdbId === trendingMovie.tmdbId
            )
        );

        setTrendingMovies(filteredTrending);
      } catch (error) {
        if (popularMovies.length === 0 && trendingMovies.length === 0) {
          setError("Failed to load movies.");
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMovies();
  }, []);
  return (
    <div className="min-h-screen bg-[#14181c] text-white flex flex-col">

      <NavBar />

      <div>
        {loading ? <HeroSectionSkeleton /> : <HeroSection movies={trendingMovies} />}

        {!token && (<div className="flex flex-1 flex-col items-center justify-center text-center px-4 mt-3 mb-10">

          <h1 className="text-5xl font-bold mb-4">
            Track films you’ve watched.
          </h1>

          <p className="text-gray-400 mb-8 max-w-xl">
            Save movies, build your watchlist, and maintain your personal diary —
            just like Letterboxd.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-[#00c030] px-6 py-3 rounded-md font-semibold hover:bg-[#00a82a]"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-500 px-6 py-3 rounded-md hover:border-white"
            >
              Sign In
            </Link>
          </div>

        </div>)}

        {error && popularMovies.length === 0 && trendingMovies.length === 0 && (
          <p className="text-red-500 mb-6">{error}</p>
        )}


        {loading ? (
          <>
            <div className="mb-10">
              <div className="h-10 w-72 bg-[#2c3440] rounded mb-3 animate-pulse" />

              <div className="h-4 w-96 bg-[#2c3440] rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-14">
              {[...Array(12)].map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
            </div>

            <div className="mb-6">
              <div className="h-8 w-64 bg-[#2c3440] rounded mb-3 animate-pulse" />

              <div className="h-4 w-80 bg-[#2c3440] rounded animate-pulse" />
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="min-w-45.5 max-w-45.5"
                >
                  <MovieCardSkeleton />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-2">
                Popular Movies
              </h1>

              <p className="text-gray-400">
                Discover popular and trending films.
              </p>
            </div>

            {popularMovies.length === 0 ? (
              <p className="text-gray-400">
                No popular movies found.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {popularMovies.map((movie) => (
                  <MovieCard
                    key={movie.tmdbId}
                    movie={movie}
                  />
                ))}
              </div>
            )}

            <div className="mt-14">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  Trending Movies
                </h1>

                <p className="text-gray-400">
                  Movies people are watching right now.
                </p>
              </div>

              {trendingMovies.length === 0 ? (
                <p className="text-gray-400">
                  No trending movies found.
                </p>
              ) : (
                <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
                  {trendingMovies.map((movie) => (
                    <div
                      key={movie.tmdbId}
                      className="min-w-45.5 max-w-45.5"
                    >
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-800 mt-14">
          © 2026 MovieDiary
        </div>

      </div>
    </div>
  );
}

export default Home;