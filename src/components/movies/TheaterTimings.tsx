import dayjs from "dayjs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowsByMovieAndLocation } from "../../apis";
import React from "react";
import { useNavigate } from "react-router-dom";


interface TheaterTimingsProps {
  movieId: string;
}

const TheaterTimings = ({ movieId }: TheaterTimingsProps) => {
  const navigate = useNavigate();
  const today = dayjs();
  const [selectedDate, setSelectedDate] = React.useState(today);
  const formattedDate = selectedDate.format("DD-MM-YYYY");
  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ["show", movieId, formattedDate],
    queryFn: () => getShowsByMovieAndLocation(movieId, formattedDate),
    placeholderData: keepPreviousData,
    enabled: !!movieId,
  });

  console.log(rawData)

  const normalizeShows = (raw: any) => {
    if (!raw) return [];
    const r = raw.data ?? raw;
    if (r?.shows) {
      if (Array.isArray(r.shows)) return r.shows;
      if (Array.isArray(r.shows.shows)) return r.shows.shows;
    }
    if (Array.isArray(r)) return r;
    return [];
  };

  const shows = normalizeShows(rawData);

  return (
    <div className="w-full">
  {/* FECHAS */}
  <div className="flex gap-3 overflow-x-auto py-4 px-2">
    {next7days.map((date) => {
      const isSelected = date.isSame(selectedDate, "day");
      return (
        <button
          key={date.toString()}
          onClick={() => setSelectedDate(date)}
          className={`flex flex-col items-center justify-center min-w-[60px] py-3 px-2 rounded-lg shadow-md transition-all
            ${isSelected ? "bg-accent text-white shadow-xl" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
          `}
        >
          <span className="text-lg font-bold">{date.format("D")}</span>
          <span className="text-xs uppercase">{date.format("ddd")}</span>
          <span className="text-[10px]">{date.format("MMM")}</span>
        </button>
      );
    })}
  </div>

  {/* SHOWS / TEATROS */}
  <div className="mt-6 space-y-6">
    {isLoading && <p className="text-white text-center">Cargando funciones...</p>}
    {isError && <p className="text-red-500 text-center">Error al cargar funciones</p>}
    {!isLoading && shows.length === 0 && (
      <p className="text-white text-center">No hay shows para esta fecha</p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {shows.map((show: any) => (
        <div
          onClick={() => navigate(
            `/movie/${movieId}/theater/${show.theater}/show/${show._id}/seat-layout`
          )}
          key={show._id}
          className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
        >
          {/* HEADER TEATRO + BOTÓN */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-semibold text-sm">
              {show.theater?.name ?? "Teatro Desconocido"}
            </h3>
            <button className="bg-accent text-black px-3 py-1 rounded text-xs font-bold hover:bg-yellow-400 transition">
              Ver detalles
            </button>
          </div>

          {/* HORARIOS */}
          <div  className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition">
              {show.startTime}
            </button>
            <button className="px-3 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition">
              {show.format} – {show.audioType}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default TheaterTimings;
