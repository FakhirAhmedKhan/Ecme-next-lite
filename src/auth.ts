import NextAuth from 'next-auth'
import appConfig from '@/configs/app.config'
import authConfig from '@/configs/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        // When an unauthenticated user needs to sign in, send them to the
        // unauthenticated entry path (the app's sign-in page).
        signIn: appConfig.unAuthenticatedEntryPath,
        // Use the sign-in page for errors as well so users land on the auth UI
        // instead of the authenticated entry.
        error: appConfig.unAuthenticatedEntryPath,
    },
    ...authConfig,
})
