import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HeroSection({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade,setFade] = useState(true)

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
        setFade(false)
        setTimeout(()=>{
            setCurrentIndex((prev) =>
            prev === movies.length - 1 ? 0 : prev + 1
      );
        setFade(true)
        },500)
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[currentIndex];

  if (!movie) return null;

  return (
    <div
      className="h-[70vh] rounded-2xl bg-cover bg-center relative overflow-hidden mb-12 transition-all duration-700"
      style={{
        backgroundImage: `url(${movie.backDropUrl})`,
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      <div className={`relative z-10 flex flex-col justify-end h-full p-10 max-w-2xl transition-all duration-500 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
        <p className="text-[#00c030] font-semibold mb-3">
          Featured Movie
        </p>

        <h1 className="text-5xl font-bold mb-4">
          {movie.title}
        </h1>

        <p className="text-gray-300 mb-6">
          Trending and popular among movie lovers right now.
        </p>

        <Link
          to={`/movies/${movie.tmdbId}`}
          className="bg-[#00c030] hover:bg-[#00a82a] px-6 py-3 rounded-md font-semibold transition w-fit"
        >
          View Movie
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;