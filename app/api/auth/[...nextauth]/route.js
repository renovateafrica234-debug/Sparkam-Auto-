import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID || '',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '',
      authorization: {
        params: {
          scope: 'email, public_profile, pages_show_list, pages_read_engagement, pages_manage_posts, instagram_basic, instagram_content_publish',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
