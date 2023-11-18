import React from "react";
import { Link } from "react-router-dom";
import { useGetTopChartsQuery } from "../redux/services/shazam";

const DetailsHeader = ({ songid }) => {
  const { data: songs } = useGetTopChartsQuery();

  const matchedSong = songs.find((song) => song.trackMetadata?.trackUri.split(':')[2] === songid);


  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={matchedSong?.trackMetadata?.displayImageUri}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {matchedSong?.trackMetadata?.artists[0]?.name}
          </p>
          <p className="text-base text-gray-400 mt-2">
          {matchedSong.trackMetadata?.trackName}
        </p>
        </div>
      </div>
   
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
