import { NextResponse } from 'next/server';

export async function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname.startsWith('/api/proxy')) {
    url.pathname = '/api/catalog';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
