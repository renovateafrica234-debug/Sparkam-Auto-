import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: { params: { scope: 'public_profile' } },
      profile(p) {
        return {
          id: p.id,
          name: p.name,
          email: `${p.id}@facebook.com`,
          image: p.picture?.data?.url || null,
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
