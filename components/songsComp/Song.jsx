import React from "react";
import useSpotify from "../../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../../lib/time";

import { currentTrackId, isPlayingState } from "../../atoms/songAtom";
import { useRecoilState } from "recoil";

const Song = ({ track, order }) => {
  const spotifyApi = useSpotify();
  const [currTrackId, setCurrTrackId] = useRecoilState(currentTrackId);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {};
  console.log("active song", track);
  return (
    <div className="grid grid-cols-2 text-gray-500 py-3 px-3 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
