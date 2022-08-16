import React, { useEffect, useState } from "react";
import { useSession, getProviders } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { shuffle } from "lodash";

const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-pink-500",
  "from-red-500",
  "from-indigo-500",
  "from-green-500",
  "from-blue-500",
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  console.log(session);

  return (
    <div className="text-white flex-grow">
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
        <img src="" alt="" />
      </section>
    </div>
  );
};

export default Center;
