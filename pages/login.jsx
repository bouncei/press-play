import { getProviders, signIn } from "next-auth/react";
// import appLogo from "../assets/logo.jpg";

const login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen justify-center">
      <img
        className="w-52 mb-5 rounded-2xl"
        src="https://images.tokopedia.net/img/cache/215-square/shops-1/2019/12/13/1787493/1787493_b675c885-0bfb-48d9-a71f-3691d45203a9.png"
        alt="appLogo"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#0b75ad] text-white px-5 py-3 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
