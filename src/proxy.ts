import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  // We set default to 'id', but if browser prefers english, we can set 'en'
  if (acceptLanguage && acceptLanguage.includes('en') && !acceptLanguage.includes('id')) {
    return 'en'
  }
  return i18n.defaultLocale
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }
}

export const config = {
  // Match ignoring Next.js internals, static files, and admin routes
  matcher: [
    '/((?!api|admin|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
