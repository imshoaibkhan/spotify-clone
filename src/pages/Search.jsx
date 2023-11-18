import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SearchCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazam";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.map((song) => song.data);



  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;


  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SearchCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data.tracks.map(item => item.data)}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
