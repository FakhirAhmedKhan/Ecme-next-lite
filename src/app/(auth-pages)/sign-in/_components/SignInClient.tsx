'use client'

import SignIn from '@/components/auth/SignIn'
import { signIn as nextAuthSignIn } from 'next-auth/react'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useSearchParams } from 'next/navigation'
import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'
import appConfig from '@/configs/app.config'

const SignInClient = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get(REDIRECT_URL_KEY)

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        setSubmitting(true)

        try {
            // Use next-auth client signIn so the browser receives the Set-Cookie
            // and session cookie is persisted. We perform a redirect to the
            // authenticated entry on success.
            await nextAuthSignIn('credentials', {
                redirect: true,
                email: values.email,
                password: values.password,
                callbackUrl: callbackUrl || appConfig.authenticatedEntryPath,
            })
        } catch (err: any) {
            console.error('Client signIn error', err)
            setMessage(err?.message ?? 'Sign in failed')
            setSubmitting(false)
        }
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google' || type === 'github') {
            await nextAuthSignIn(type, { callbackUrl: callbackUrl || appConfig.authenticatedEntryPath })
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
