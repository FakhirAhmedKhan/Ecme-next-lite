import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import SessionContext from '@/components/auth/AuthProvider/SessionContext'

const useCurrentSession = () => {
    const context = useContext(SessionContext)
    const { data: clientSession } = useSession()

    // Prefer server-provided context (from RootLayout). If it's not present
    // (for example, after a client-only sign-in flow) fall back to the
    // next-auth client session so UI updates immediately.
    const session = context ?? clientSession ?? { expires: '', user: {} }

    return { session }
}

export default useCurrentSession
