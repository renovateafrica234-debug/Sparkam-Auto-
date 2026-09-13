import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || process.env.FACEBOOK_SECRET,
      authorization: { params: { scope: 'public_profile,email' } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // this forces it to ignore any old link check
  callbacks: {
    async signIn(){ return true }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
