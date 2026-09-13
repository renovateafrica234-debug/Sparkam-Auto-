import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
      FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || process.env.FACEBOOK_APP_ID,
                  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || process.env.FACEBOOK_SECRET,
                        authorization: { params: { scope: "public_profile" } },
                              userinfo: { params: { fields: "id,name,picture.type(large)" } },
                                    profile(p) {
                                            return {
                                                      id: p.id,
                                                                name: p.name ?? `User ${p.id}`,
                                                                          email: `${p.id}@facebook.com`,
                                                                                    image: p.picture?.data?.url ?? null,
                                                                                            }
                                                                                                  },
                                                                                                      }),
                                                                                                        ],
                                                                                                          secret: process.env.NEXTAUTH_SECRET,
                                                                                                            callbacks: {
                                                                                                                async jwt({ token, profile }) {
                                                                                                                      if (profile?.id) token.id = profile.id
                                                                                                                            return token
                                                                                                                                },
                                                                                                                                    async session({ session, token }) {
                                                                                                                                          if (token?.id && session.user) {
                                                                                                                                                  session.user.id = token.id
                                                                                                                                                          session.user.email = `${token.id}@facebook.com`
                                                                                                                                                                }
                                                                                                                                                                      return session
                                                                                                                                                                          },
                                                                                                                                                                            },
                                                                                                                                                                            }

                                                                                                                                                                            const handler = NextAuth(authOptions)
                                                                                                                                                                            export { handler as GET, handler as POST }