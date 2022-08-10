import Head from "next/head";
import Image from "next/image";

// PAGE COMPONENTS
import { SideBar, Footer } from "../components";

const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Press Play</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* SideBar */}
        <SideBar />
        {/* Main Section */}
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
