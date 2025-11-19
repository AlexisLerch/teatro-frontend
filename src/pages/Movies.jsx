import { getAllMovies } from '../apis';
import { useQuery } from '@tanstack/react-query';

const Movies = () => {

  const { data: _allMovies, isError: _isError } = useQuery({
    queryKey: ["allMovies"],
    queryFn: async () => {
      return await getAllMovies();
    },
    keepPreviousData: true,
  });

  return (
    <div>Movies</div>
  )
}

export default Movies