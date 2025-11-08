'use server'

import { signIn } from '@/auth'
import appConfig from '@/configs/app.config'
import { AuthError } from 'next-auth'
import type { SignInCredential } from '@/@types/auth'

export const onSignInWithCredentials = async (
    { email, password }: SignInCredential,
    callbackUrl?: string,
) => {
    try {
        // Request signIn without an automatic redirect so we can inspect the
        // response (including Set-Cookie) and return it to the client for
        // debugging. `redirect: false` causes NextAuth to return an object.
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            redirectTo: callbackUrl || appConfig.authenticatedEntryPath,
        })

        console.log('[handleSignIn] signIn response ->', res)

        return res
    } catch (error) {
        if (error instanceof AuthError) {
            /** Customize error message based on AuthError */
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' }
                default:
                    return { error: 'Something went wrong!' }
            }
        }
        throw error
    }
}
