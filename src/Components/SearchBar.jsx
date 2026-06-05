import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

function SearchBar() {
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim().length < 2) return;

    const searchText = name.trim()

    setSuggestions([])
    setName("")

    setSuggestions([]);
    navigate(`/search?name=${encodeURIComponent(searchText)}`);
  }

  useEffect(() => {
    if (name.trim().length <= 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await API.get(
          `/movies/search?name=${encodeURIComponent(name)}`
        );
        setSuggestions(data);
      } catch (error) {
        console.log(error.response?.status);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:w-40">
      <input
        type="text"
        placeholder="Search movies..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-40 bg-[#2c3440] border border-gray-700 rounded-md px-4 py-1 text-white outline-none focus:border-[#00c030]"
      />

      <button type="submit" className="hidden">
        Search
      </button>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[#1c2228] border border-gray-700 rounded-md mt-2 overflow-hidden z-50">
          {suggestions.slice(0, 6).map((movie, index) => {
            const movieId = movie.tmdbId || movie.id;

            return (
              <Link
                key={movieId || index}
                to={`/movies/${movieId}`}
                onClick={() => {
                  setName("");
                  setSuggestions([]);
                }}
                className="flex items-center gap-3 p-3 hover:bg-[#2c3440]"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/300x450?text=No+Image";
                  }}
                  className="w-10 h-14 object-cover rounded"
                />

                <div>
                  <p className="font-semibold">{movie.title}</p>
                  <p className="text-sm text-gray-400">
                    {movie.releaseDate?.split("-")[0]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </form>
  );
}

export default SearchBar;