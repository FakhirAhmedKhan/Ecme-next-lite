import NextAuth from 'next-auth'

import authConfig from '@/configs/auth.config'
import {
    authRoutes as _authRoutes,
    publicRoutes as _publicRoutes,
} from '@/configs/routes.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'

const { auth } = NextAuth(authConfig)

const extractPaths = (routes: any): string[] => {
    if (!routes) return []
    if (Array.isArray(routes)) return routes.map((r) => (r?.path || '').toString().toLowerCase())
    if (typeof routes === 'object') return Object.keys(routes).map((k) => k.toString().toLowerCase())
    return []
}

const publicRoutes = extractPaths(_publicRoutes)
const authRoutes = extractPaths(_authRoutes)

// appConfig.apiPrefix is a full URL in your config (eg. https://.../api)
// derive the pathname so we compare against nextUrl.pathname correctly
let apiAuthPrefix = ''
try {
    const url = new URL(appConfig.apiPrefix)
    apiAuthPrefix = `${url.pathname.replace(/\/$/, '')}/auth`
} catch (e) {
    // fallback if apiPrefix is already a path
    apiAuthPrefix = `${appConfig.apiPrefix.replace(/\/$/, '')}/auth`
}

export default auth((req) => {
    const { nextUrl } = req
    const isSignedIn = !!req.auth

    const pathname = nextUrl.pathname.toLowerCase()
    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(pathname)
    const isAuthRoute = authRoutes.includes(pathname)

    /** Skip auth middleware for api routes */
    if (isApiAuthRoute) return

    if (isAuthRoute) {
        if (isSignedIn) {
            /** Redirect to authenticated entry path if signed in & path is auth route */
            return Response.redirect(
                new URL(appConfig.authenticatedEntryPath, nextUrl),
            )
        }
        return
    }

    /** Redirect to authenticated entry path if signed in & path is public route */
    if (!isSignedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        return Response.redirect(
            new URL(
                `${appConfig.unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${callbackUrl}`,
                nextUrl,
            ),
        )
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
}
