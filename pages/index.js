import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

// PAGE COMPONENTS
import { SideBar, Footer, Center } from "../components";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Press Play</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/* SideBar */}
        <SideBar />
        {/* Main Section */}
        <Center />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
