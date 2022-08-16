import React, { useEffect, useState } from "react";
import { useSession, getProviders } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { shuffle } from "lodash";
// RECOIL
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import useSpotify from "../../hooks/useSpotify";

// PAGE SUB-COMPONENTS
import Songs from "../songsComp/Songs";

const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-pink-500",
  "from-red-500",
  "from-cyan-500",
  "from-orange-500",
  "from-green-500",
  "from-blue-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  console.log("gaming playlistId", playlistId);

  useEffect(() => {
    // Shuffling the array of background colors or the header
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId, session]);

  // console.log("playlist detials", playlist);
  return (
    <div className="text-white flex-grow overflow-y-scroll scrollbar-hide h-screen">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-gray-800">
          <img
            className="rounded-full w-10 h-10"
            src={
              session?.user.image ??
              "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1385&q=80"
            }
            alt="userImage"
          />

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black  h-80 text-white p-8 w-full`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0].url}
          alt=""
        />

        <div className="">
          <p>PUBLIC PLAYLIST</p>
          <h1 className="text-2xl md:text3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  );
};

export default Center;
