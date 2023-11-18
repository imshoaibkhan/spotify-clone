import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetPlayableUrlQuery } from "../redux/services/shazam";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useEffect, useState } from "react";

const SearchCard = ({ song, i, isPlaying, activeSong, data }) => {


  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };


  return (
    <div className="flex flex-col w-[155px] sm:w-[175px] lg:w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-fit group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            (activeSong?.name === song?.name)
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>
        <img
          alt="song_img"
          src={song?.albumOfTrack?.coverArt?.sources[0]?.url ?? ""}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/`}>{song?.name || "songName"}</Link>
        </p>

        <p className="tex-sm truncate text-gray-300 mt-1">
          <Link to={"/"}>
            {song?.artists?.items[0]?.profile.name || "singerName"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
