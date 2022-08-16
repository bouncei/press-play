import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";

// PAGE COMPONENTS
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white  ">
      {playlist?.tracks.items.map((item, index) => (
        <Song key={item.track.id} track={item} order={index} />
      ))}
    </div>
  );
};

export default Songs;
