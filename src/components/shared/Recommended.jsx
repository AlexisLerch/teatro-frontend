import React from 'react'
// import { movies } from '../../utils/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getRecommendedMovies } from '../../apis';
import { useNavigate } from 'react-router-dom';

const Recommended = () => {

  const navigate = useNavigate();

  const handleNavigate = (movie) => {
    const originalTitle = movie.title;
    const cleanedTitle = originalTitle.includes(":") ? originalTitle.replace(/:/g, "") : originalTitle;
    const formattedTitle = cleanedTitle.replace(/\s+/g, "-").toLowerCase();
    navigate(`/movies/${formattedTitle}/${movie._id}/ticket`);
  }

  const { data: recMovies, isError } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: async () => {
      return await getRecommendedMovies()
    },
    placeholderData: keepPreviousData
  });

  if(isError){
    console.log("Error en la consulta")
  }

  console.log(recMovies)

  return (
    <section className="w-full py-10 bg-[#0a0a0a] text-white">
      <div className="max-w-screen-xl mx-auto px-4">
        
        {/* Título */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide text-gray-100">Obras Recomendadas</h2>
          <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-200 transition-colors font-medium">
            Ver todas →
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recMovies?.data?.movies?.map((movie, i) => (
            <div
              key={i}
              onClick={() => handleNavigate(movie)}
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#111] border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              {/* Imagen */}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.genre.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommended
