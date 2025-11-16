import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getMovieById } from '../apis';
import { useParams } from "react-router-dom";

const MovieDatails = () => {
  const { id } = useParams();

  const { data: movie, isError, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    placeholderData: keepPreviousData
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar la película</div>;

  return (
    <div className="text-dark">
      <h1 className='text-3xl'>{movie?.title}</h1>
      <p>{movie?.description}</p>
    </div>
  );
};

export default MovieDatails;
