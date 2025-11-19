import dayjs from "dayjs";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowsByMovieAndLocation } from "../../apis";

interface TheaterTimingsProps {
  movieId: string;
}

const TheaterTimings = ({ movieId }: TheaterTimingsProps) => {
  const today = dayjs();
  const [selectDate, setSelectDate] = useState(today);
  const formattedDate = selectDate.format("DD-MM-YYYY");
  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  const { data: showData, isLoading, isError } = useQuery({
    queryKey: ["show", movieId, formattedDate],
    queryFn: () => getShowsByMovieAndLocation(movieId, formattedDate),
    placeholderData: keepPreviousData,
    enabled: !!movieId,
  });

  // ---- Normalizador robusto ----
  const normalizeShows = (raw: any): any[] => {
    if (!raw) return [];

    // caso: axios response { data: {...}, status: ... }
    const r = raw.data ?? raw;

    // Posibles estructuras detectadas:
    // 1) r = { shows: [ ... ] }
    // 2) r = { shows: { shows: [ ... ] } } (doble capa)
    // 3) r = [ ... ] (array directo)
    // 4) r = { data: { shows: ... } } (raro)
    // 5) r = { shows: {...} } -> convertir a array si es objeto con keys

    // 1 & 2
    if (r?.shows) {
      // r.shows puede ser array o objeto con .shows
      if (Array.isArray(r.shows)) return r.shows;
      if (Array.isArray(r.shows.shows)) return r.shows.shows;
      // si es objeto de grouping, intentar extraer arrays internamente
      // ejemplo: r.shows = { "theaterId": [ ... ], ... } -> concatenar
      if (typeof r.shows === "object") {
        const values = Object.values(r.shows);
        // values puede ser arrays de shows o grouped objects
        const flattened: any[] = [];
        values.forEach((v: any) => {
          if (Array.isArray(v)) flattened.push(...v);
          else if (v?.theater?.shows && Array.isArray(v.theater.shows)) flattened.push(...v.theater.shows);
          else if (v?.shows && Array.isArray(v.shows)) flattened.push(...v.shows);
        });
        if (flattened.length) return flattened;
      }
    }

    // 3
    if (Array.isArray(r)) return r;

    // 4
    if (r?.data?.shows) {
      if (Array.isArray(r.data.shows)) return r.data.shows;
      if (Array.isArray(r.data.shows.shows)) return r.data.shows.shows;
    }

    // 5 fallback: buscar arrays en propiedades del objeto
    const foundArrays: any[] = [];
    Object.values(r).forEach((val: any) => {
      if (Array.isArray(val)) foundArrays.push(...val);
      else if (val && typeof val === "object") {
        Object.values(val).forEach((inner: any) => {
          if (Array.isArray(inner)) foundArrays.push(...inner);
        });
      }
    });
    if (foundArrays.length) return foundArrays;

    // nada: devolver vacío
    return [];
  };

  const rawResponse = showData ?? null;
  const parsedShows = normalizeShows(rawResponse);

  console.log(">>> RAW showData:", showData);
  console.log(">>> parsedShows (array):", parsedShows);

  // seguridad: si no es array, prevenir crash
  const shows = Array.isArray(parsedShows) ? parsedShows : [];

  // AGRUPAR POR THEATER ID/NAME (theater puede ser object o id)
  const groupedShows = shows.reduce((acc: any, show: any) => {
    // teatro: puede venir como populated object o como ObjectId string
    const theaterObj = show.theater ?? show.theaterId ?? show.theatre ?? null;
    const theaterKey =
      (theaterObj && typeof theaterObj === "object" && (theaterObj._id ?? theaterObj.id))
        ? (theaterObj._id ?? theaterObj.id).toString()
        : String(theaterObj ?? "unknown");

    if (!acc[theaterKey]) acc[theaterKey] = { theater: theaterObj, shows: [] };
    acc[theaterKey].shows.push(show);
    return acc;
  }, {});

  // UI: mostrar raw JSON para debug y parsedShows
  return (
    <>
      <hr className="my-2 border-gray-200" />

      {/* SELECTOR DE FECHAS */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto py-4 px-2">
        {next7days.map((date, i) => {
          const isSelected = selectDate.isSame(date, "day");
          return (
            <button
              key={i}
              onClick={() => setSelectDate(date)}
              className={`flex cursor-pointer flex-col border border-gray-200 items-center px-3 py-2 rounded-lg min-w-[50px] ${
                isSelected ? "bg-white text-black font-semibold" : "text-white hover:bg-gray-700"
              }`}
            >
              <span className="text-sm font-black">{date.format("D")}</span>
              <span className="text-xs">{date.format("ddd")}</span>
              <span className="text-[10px]">{date.format("MMM")}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-8 px-4 mb-10">
        {/* Mostrar estado */}
        {isLoading && <div className="text-white">Cargando funciones...</div>}
        {isError && <div className="text-red-500">Error al cargar funciones</div>}

        {/* SIN SHOWS */}
        {!isLoading && shows.length === 0 && (
          <div className="text-center text-white">No shows for the selected date</div>
        )}

        {/* SHOWS AGRUPADOS POR TEATRO */}
        {Object.keys(groupedShows).map((theaterId) => (
          <div key={theaterId}>
            <div className="flex items-start gap-3 mb-2">
              <img src="/cinema.png" alt="logo" className="w-8 h-8 object-contain" />
              <div>
                <h2 className="text-sm font-semibold">
                  {groupedShows[theaterId].theater?.name ?? `Theater ${theaterId}`}
                </h2>
                <p className="text-sm text-gray-500">Shows available</p>
              </div>
            </div>

            {/* HORARIOS */}
            <div className="flex flex-wrap gap-3 ml-11">
              {groupedShows[theaterId].shows.map((show: any) => (
                <button
                  key={show._id ?? show.id ?? `${theaterId}-${Math.random()}`}
                  className="border border-gray-300 px-8 py-2 rounded-lg cursor-pointer text-sm flex flex-col hover:bg-gray-700 text-white"
                >
                  <span className="leading-tight font-semibold">{show.startTime}</span>
                  <span className="text-[10px] text-white font-black">
                    {show.format} – {show.audioType}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* DEBUG: mostrar raw + parsed en pantalla (quitar en prod) */}
        <div className="mt-8 text-xs text-gray-300">
          <p className="font-semibold">DEBUG: raw response</p>
          <pre className="max-h-40 overflow-auto bg-neutral-900 p-2 rounded text-[10px]">
            {JSON.stringify(rawResponse, null, 2)}
          </pre>

          <p className="font-semibold mt-2">DEBUG: parsedShows (array)</p>
          <pre className="max-h-40 overflow-auto bg-neutral-900 p-2 rounded text-[10px]">
            {JSON.stringify(shows, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
};

export default TheaterTimings;
