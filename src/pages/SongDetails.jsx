import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongLyricsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazam";
import { useEffect } from "react";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songLyrics, isFetching: isFetchingSongLyrics } =
    useGetSongLyricsQuery(songid);
  const {
    data,
    isFetching: isFetchingSongRelated,
    error,
  } = useGetSongRelatedQuery(songid);

  // useEffect(()=> {
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // },[songid])

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongLyrics || isFetchingSongRelated)
    return <Loader title="searching song details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col ">
      <DetailsHeader songid={songid} />
      <div className="mb-10">
        <h2 className="text-white text-2xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songLyrics?.lyrics?.syncType === "LINE_SYNCED" ? (
            <>
              {songLyrics?.lyrics?.lines
                .flatMap((line) => line?.words || [])
                .map((word, i) => (
                  <p className="text-gray-400 text-base my-1" key={i}>
                    {word}{" "}
                  </p>
                ))}
            </>
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found
            </p>
          )}
        </div>
      </div>
      {/* <RelatedSongs
      data={data}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePauseClick={handlePauseClick}
      handlePlayClick={handlePlayClick} /> */}
    </div>
  );
};

export default SongDetails;
