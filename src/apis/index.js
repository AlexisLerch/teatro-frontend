import { axiosWrapper } from "./axiosWrapper";

export const getRecommendedMovies = () => axiosWrapper.get("/movies/recommended");

export const getAllMovies = () => axiosWrapper.get("/movies");

export const getMovieById = (id) => axiosWrapper.get(`/movies/${id}`);

export const getShowsByMovieAndLocation = (movieId, date) => axiosWrapper.get(`/shows`, {
    params: {
        movieId,
        date
    }
});

export const getShowById = (showId) => axiosWrapper.get(`/shows/${showId}`);
