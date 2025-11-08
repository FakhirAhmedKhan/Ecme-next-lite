import { auth } from '@/auth'
import AuthProvider from '@/components/auth/AuthProvider'
import ThemeProvider from '@/components/template/Theme/ThemeProvider'
import pageMetaConfig from '@/configs/page-meta.config'
import NavigationProvider from '@/components/template/Navigation/NavigationProvider'
import { getNavigation } from '@/server/actions/navigation/getNavigation'
import { getTheme } from '@/server/actions/theme'
import type { ReactNode } from 'react'
import '@/assets/styles/app.css'

export const metadata = {
    ...pageMetaConfig,
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const navigationTree = await getNavigation()
    const theme = await getTheme()
    const session = await auth()
    // Debug: log server-side auth() result so we can confirm if the server
    // sees the current session (helps diagnose 'Anonymous' UI).
    // This will appear in the Next dev server console.
    console.log('[RootLayout] auth() ->', session)

    return (
        <AuthProvider session={session}>
            <html
                className={theme.mode === 'dark' ? 'dark' : 'light'}
                dir={theme.direction}
                suppressHydrationWarning
            >
                <body suppressHydrationWarning>
                    <ThemeProvider theme={theme}>
                        <NavigationProvider navigationTree={navigationTree}>
                            {children}
                        </NavigationProvider>
                    </ThemeProvider>
                </body>
            </html>
        </AuthProvider>
    )
}
