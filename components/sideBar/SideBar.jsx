import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
// RECOIL
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import { stringify } from "querystring";

const SideBar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  // Truncate function for the playlist name
  const truncateString = (str) => {
    console.log("length of str", str.length);
    if (str.length > 23) {
      let tru = str.substring(0, 23);
      return tru + "...";
    }

    return str;
  };

  console.log("user details", playlists);

  return (
    <div className="text-gray-500 p-5 text-sm lg:text-xs border-grey-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[23rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-500" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-700" />

        {/* Section to render Existing Playlists */}
        {playlists.map((item, index) => (
          <p
            key={index}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(item.id)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
