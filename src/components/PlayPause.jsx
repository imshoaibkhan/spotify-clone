import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && (activeSong?.trackMetadata?.trackName || activeSong?.name) === (song?.trackMetadata?.trackName || song?.name) ? (
    <FaPauseCircle
      size={35}
      className='text-gray-300'
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className='text-gray-300'
      onClick={handlePlay}
    />
  );

export default PlayPause;
