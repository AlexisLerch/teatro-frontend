import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../apis';
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import TheaterTimings from '../components/movies/TheaterTimings';

const MovieDatails = () => {
  const { id } = useParams();

  const { data: movieRes, isError, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    placeholderData: keepPreviousData
  });

  const movie = movieRes?.data?.movie;

  if (isLoading) return <div className="text-white">Cargando...</div>;
  if (isError) return <div className="text-white">Error al cargar la película</div>;

  return (
     <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      
      {/* CONTENEDOR PRINCIPAL */}
       <div className="bg-neutral-900 rounded-xl p-6 shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-6">
        
        {/* IMAGEN */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="rounded-lg w-60 md:w-full object-cover shadow-md"
          />
        </div>

        {/* INFO DE LA PELÍCULA */}
        <div className="flex flex-col space-y-4 w-full md:w-2/3">

          {/* TÍTULO */}
          <h1 className="text-3xl font-bold">{movie.title}</h1>

          {/* DESCRIPCIÓN */}
          <p className="text-sm text-gray-300 leading-relaxed">
            {movie.description}
          </p>

          {/* DATOS EXTRA */}
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mt-4">

            {/* RATING */}
            {movie.rating && (
              <p><span className="text-white font-semibold">Rating:</span> ⭐ {movie.rating}</p>
            )}

            {/* VOTOS */}
            {movie.votes && (
              <p><span className="text-white font-semibold">Votos:</span> {movie.votes.toLocaleString()}</p>
            )}

            {/* CERTIFICATION */}
            {movie.certification && (
              <p><span className="text-white font-semibold">Certificación:</span> {movie.certification}</p>
            )}

            {/* RELEASE DATE */}
            {movie.releaseDate && (
              <p>
                <span className="text-white font-semibold">Estreno:</span>{" "}
                {format(new Date(movie.releaseDate), "dd/MM/yyyy")}
              </p>
            )}

            {/* FORMATO */}
            {movie.format?.length > 0 && (
              <p>
                <span className="text-white font-semibold">Formato:</span>{" "}
                {movie.format.join(", ")}
              </p>
            )}

          </div>

          {/* GÉNEROS */}
          {movie.genre?.length > 0 && (
            <div>
              <p className="font-semibold text-white mb-1">Géneros:</p>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-gray-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* IDIOMAS */}
          {movie.language?.length > 0 && (
            <div>
              <p className="font-semibold text-white mb-1">Idiomas:</p>
              <div className="flex flex-wrap gap-2">
                {movie.language.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-gray-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <div className="w-full max-w-4xl mt-10">
        <TheaterTimings movieId={id} />
      </div>
    </div>
  );
};

export default MovieDatails;
