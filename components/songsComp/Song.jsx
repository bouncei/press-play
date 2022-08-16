import React from "react";
import useSpotify from "../../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../../lib/time";

const Song = ({ track, order }) => {
  const spotifyApi = useSpotify();

  console.log("active song", track);
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div>
          <p>{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <p className="hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
