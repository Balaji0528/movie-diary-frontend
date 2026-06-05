import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie.tmdbId}`}>
      <div className="group cursor-pointer">
        <div className="overflow-hidden rounded-lg border border-gray-700 group-hover:border-[#00c030] transition">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/300x450?text=No+Image";
            }}
            className="w-full h-70 object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        <h2 className="text-sm text-gray-200 mt-3 truncate font-semibold">
          {movie.title}
        </h2>

        <p className="text-xs text-gray-500">
          {movie.releaseDate?.split("-")[0]}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;