import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

const refreshAccessToken = (token) => {
  // asynchrous function to refresh access token when it has expired
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(toke.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log("REFRESHED TOKEN IS", refreshedToken)


    return {
        ...token,
        accessToken: refreshedToken.accessToken,
        accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        refreshToken: refreshedToken.refreshToken ?? token.refreshToken  //Replace if new one came back, else fall back to the old refresh token
    }

  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};


export default NextAuth({
  // Configuration for authentication prroviders
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // add more providers here
  ],
  // Encrypting JSON Web Token(JWT)
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login", //Defining My Custom logIn Page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: Date.now() + account.expires_at * 1000, //Handling Expiring time in milleseconds(i.e; *1000)
        };
      }

      //   If the access token hasn't expired, return previous token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },


    async session({session, token}) {
        session.user.accessToken = token.accessToken
        session.user.refreshAccessToken = token.refreshToken
        session.user.username = token.username
    }
  },
});
