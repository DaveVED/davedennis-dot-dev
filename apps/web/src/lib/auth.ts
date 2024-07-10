import {
    NextAuthOptions,
    Session,
  } from "next-auth";
  import Auth0Provider from "next-auth/providers/auth0";
  import type { JWT } from "next-auth/jwt";
  import { SupabaseAdapter } from "@next-auth/supabase-adapter";
  
  export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID as string,
        clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
        issuer: process.env.AUTH0_ISSUER_BASE_URL,
      }),
    ],
    adapter: SupabaseAdapter({
      url: process.env.SUPABASE_URL!,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),
    callbacks: {
      async jwt({ token }: { token: JWT }): Promise<JWT> {
        return token;
      },
      async session({ session }: { session: Session }): Promise<Session> {
        return session;
      },
    },
    debug: process.env.NODE_ENV !== "production",
  };