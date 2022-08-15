import { useSession, getProviders } from "next-auth/react";
import React from "react";

const Center = () => {
  const { data: session } = useSession();

  //   console.log(getProviders());

  return (
    <div className="text-white flex flex-grow scroll-ba">
      <header>
        <div className="flex items-center bg-black space-x-3 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt="userImage"
          />

          <h2>{session?.user.name}</h2>
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}
      >
        <img src="" alt="" />
      </section>
    </div>
  );
};

export default Center;
