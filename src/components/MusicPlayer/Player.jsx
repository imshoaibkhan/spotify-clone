/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';
import { useGetPlayableUrlQuery } from '../../redux/services/shazam';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  const activeSongId = activeSong?.trackMetadata?.trackUri.split(':')[2] || activeSong?.uri.split(':')[2]
  const { data: playableUrl, error} = useGetPlayableUrlQuery(activeSongId)




  useEffect(() => {
    if (error) {
      console.error('Errro fetching playable URL:', error)
    }
  }, [error]);



  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={playableUrl?.tracks[0]?.preview_url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;



