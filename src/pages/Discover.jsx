import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetTopChartsQuery } from "../redux/services/shazam";
import { useEffect, useState } from "react";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const [cachedData, setCachedData] = useState(
    JSON.parse(localStorage.getItem("topCharts")) || []
  );
  const [lastFetchTime, setLastFetchTime] = useState(
    JSON.parse(localStorage.getItem("lastFetchTime")) || null
  );
  const genreTitle = "Pop";
  const cacheExpirationTime = 48 * 60 * 60 * 1000;

  useEffect(() => {
    if (data && !isFetching && !error) {
      const currentTime = new Date().getTime();

      if (!lastFetchTime || currentTime - lastFetchTime > cacheExpirationTime) {
        localStorage.setItem("topCharts", JSON.stringify(data));
        localStorage.setItem("lastFetchTime", JSON.stringify(currentTime));
        setCachedData(data);
        setLastFetchTime(currentTime);
      }
    }
  }, [data, isFetching, error]);

  if (isFetching && cachedData.length === 0) {
    return <Loader title="Loading songs..." />;
  }

  if (error) return <Error />;

  // console.log(data);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10 ">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 text-sm  rounded-lg outline-none sm:mt-0 mt-5 p-3"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {cachedData.map((song, i) => (
          <SongCard
            key={song.chartEntryData?.currentRank}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
