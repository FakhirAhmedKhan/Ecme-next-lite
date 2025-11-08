import { handlers } from '@/auth'
import type { NextRequest } from 'next/server'

// Wrap NextAuth handlers so we can log request/response headers for
// debugging (e.g., inspect Set-Cookie on sign-in).
const { GET: nextAuthGET, POST: nextAuthPOST } = handlers

export async function GET(req: NextRequest) {
	try {
		console.log('[nextauth] GET request headers ->', Object.fromEntries(req.headers))
		const res = await nextAuthGET(req)
		try {
			const headers: Array<[string, string]> = []
			for (const pair of res.headers) headers.push(pair)
			console.log('[nextauth] GET response headers ->', headers)
		} catch (e) {
			console.log('[nextauth] GET response headers: unable to enumerate', e)
		}
		return res
	} catch (err) {
		console.error('[nextauth] GET handler error', err)
		throw err
	}
}

export async function POST(req: NextRequest) {
	try {
		console.log('[nextauth] POST request headers ->', Object.fromEntries(req.headers))
		const res = await nextAuthPOST(req)
		try {
			const headers: Array<[string, string]> = []
			for (const pair of res.headers) headers.push(pair)
			console.log('[nextauth] POST response headers ->', headers)
		} catch (e) {
			console.log('[nextauth] POST response headers: unable to enumerate', e)
		}
		return res
	} catch (err) {
		console.error('[nextauth] POST handler error', err)
		throw err
	}
}
