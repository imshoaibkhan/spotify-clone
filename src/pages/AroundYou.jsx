import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTop20Query } from "../redux/services/shazam";

const CountryTracks = () => {
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTop20Query();

  if (isFetching && loading)
    return <Loader title="Loading Songs around you..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around you
      </h2>

      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {data?.map((song, i) => (
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

export default CountryTracks;
