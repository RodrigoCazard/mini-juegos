import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
      const { pathname } = request.nextUrl;

      // Detectar si la URL contiene `companyName-companyId`
      const match = pathname.match(/^\/([^\/]+)-(\d+)$/);

      if (match) {
            const companyName = match[1];
            const companyId = match[2];

            // Settear las cookies
            const response = NextResponse.next();
            response.cookies.set('companyName', companyName, { path: '/', sameSite: 'lax' });
            response.cookies.set('companyId', companyId, { path: '/', sameSite: 'lax' });

            return response;  // Devuelve la respuesta con cookies
      }

      // Redirigir si las cookies ya están presentes
      const companyId = request.cookies.get('companyId')?.value;
      const companyName = request.cookies.get('companyName')?.value;

      if (companyId && companyName && pathname === '/') {
            return NextResponse.redirect(new URL(`/${companyName}-${companyId}`, request.url));
      }

      return NextResponse.next();  // Continuar si no se cumplen las condiciones anteriores
}

export const config = {
      matcher: ['/:companyNameAndId*', '/'],  // Aplica este middleware tanto en las rutas con `companyName-companyId` como en la raíz `/`
};
