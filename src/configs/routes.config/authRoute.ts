import type { Routes } from '@/@types/routes'

// Standardized shape: object keyed by path -> Route
// This matches the `Routes` type used across the app.
const authRoute: Routes = {
    '/sign-in': {
        key: 'signIn',
        authority: [],
    },
    // add other auth routes here if needed:
    // '/sign-up': { key: 'signUp', authority: [] },
    // '/forgot-password': { key: 'forgotPassword', authority: [] },
    // '/reset-password': { key: 'resetPassword', authority: [] },
}

export default authRoute