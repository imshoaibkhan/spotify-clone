import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazam";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h4 className="font-bold text-sm text-white mr-3">{i + 1}.</h4>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-16 h-16 rounded-lg"
        src={song?.trackMetadata?.displayImageUri}
        alt={song.trackMetadata?.trackName}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.trackMetadata?.trackUri.split(":")[2]}`}>
          <p className="text-base font-bold text-white">
            {song.trackMetadata?.trackName}
          </p>
        </Link>

        <Link>
          <p className="text-sm text-gray-300 mt-1">
            {song.trackMetadata?.artists[0]?.name}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [artistImg, setArtistImg] = useState([]);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const fetchArtistImage = async () => {
      const artistIds = topPlays.map(
        (item) => item.trackMetadata?.artists[0]?.spotifyUri.split(":")[2]
      );

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            import.meta.env.VITE_SHAZAM_RAPID_API_KEY,
          "'X-RapidAPI-Host": "spotify81.p.rapidapi.com",
        },
      };

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      try {
        const cachedImages =
          JSON.parse(localStorage.getItem("cachedImages")) || {};
        const newImages = {};

        for (let i = 0; i < artistIds.length; i++) {
          if (cachedImages[artistIds[i]]) {
            newImages[artistIds[i]] = cachedImages[artistIds[i]];
          } else {
            const response = await fetch(
              `https://spotify81.p.rapidapi.com/artists?ids=${artistIds[i]}`,
              options
            );
            const data = await response.json();

            const imageUrl = data?.artists[0]?.images[2]?.url;
            newImages[artistIds[i]] = imageUrl;

            await delay(500);
          }
        }

        setArtistImg(Object.values(newImages));

        localStorage.setItem("cachedImages", JSON.stringify(newImages));
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    if (topPlays) {
      fetchArtistImage();
    }
  }, [data]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ data, song, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-4 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Top Charts</h2>
          <Link to="/">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.chartEntryData.currentRank}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Top Artist</h2>
          <Link to="/">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.chartEntryData?.currentRank}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/`}>
                <img
                  src={artistImg[i]}
                  alt="name"
                  className="rounded-full w-full object-cover h-4/5"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
