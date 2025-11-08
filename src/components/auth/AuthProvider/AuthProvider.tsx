'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import SessionContext from './SessionContext'
import type { Session as NextAuthSession } from 'next-auth'
import { useEffect, useRef } from 'react'
import handleSignOut from '@/server/actions/auth/handleSignOut'
import appConfig from '@/configs/app.config'

type Session = NextAuthSession | null

type AuthProviderProps = {
    session: Session | null
    children: React.ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const { session, children } = props
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        // For test-only: force sign-out exactly after 30 seconds from when a
        // session becomes available. This guarantees deterministic logout for
        // testing/perpass flows. Clear previous timer on session change.
        if (timerRef.current) {
            window.clearTimeout(timerRef.current)
            timerRef.current = null
        }

        if (session && session.user) {
            const ms = 30 * 1000 // 30 seconds
            // setTimeout returns a number in browsers
            timerRef.current = window.setTimeout(async () => {
                try {
                    await handleSignOut()
                    // after server signOut returns, navigate to sign-in page
                    if (typeof window !== 'undefined') {
                        window.location.href = appConfig.unAuthenticatedEntryPath
                    }
                } catch (err) {
                    console.error('Auto sign-out failed', err)
                }
            }, ms)
        }

        return () => {
            if (timerRef.current) {
                window.clearTimeout(timerRef.current)
                timerRef.current = null
            }
        }
    }, [session])

    return (
        /**
         * since the next auth useSession hook was triggering mutliple re-renders,
         * we use our custom session provider and still include the next-auth
         * session provider. Set a small `refetchInterval` so the client polls the
         * session endpoint and notices the short (30s) session expiration.
         */
        <NextAuthSessionProvider
            session={session}
            refetchOnWindowFocus={false}
            // poll every 5 seconds so the client observes session expiry quickly
            refetchInterval={5}
        >
            <SessionContext.Provider value={session}>
                {children}
            </SessionContext.Provider>
        </NextAuthSessionProvider>
    )
}

export default AuthProvider
