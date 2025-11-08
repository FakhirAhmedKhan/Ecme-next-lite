'use server'

import { signOut } from '@/auth'
import appConfig from '@/configs/app.config'

const handleSignOut = async () => {
    const redirectTo = appConfig.unAuthenticatedEntryPath
    // log the intended redirect target for debugging
    console.log('[handleSignOut] redirectTo ->', redirectTo)

    // Request signOut without performing an automatic redirect so we can
    // inspect the returned value and let the client navigate explicitly.
    const res = await signOut({ redirect: false, redirectTo })
    console.log('[handleSignOut] signOut response ->', res)

    return res
}

export default handleSignOut
