/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
            remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // Agrega aquí el dominio permitido
        port: '', // Deja el puerto vacío si no es necesario especificar uno
        pathname: '/**', // Esto permite todas las rutas del dominio
                  },
                  {
        protocol: 'https',
        hostname: 'postimg.cc', // Agrega aquí el dominio permitido
        port: '', // Deja el puerto vacío si no es necesario especificar uno
        pathname: '/**', // Esto permite todas las rutas del dominio
          },{
        protocol: 'https',
        hostname: 'i.postimg.cc', // Agrega aquí el dominio permitido
        port: '', // Deja el puerto vacío si no es necesario especificar uno
        pathname: '/**', // Esto permite todas las rutas del dominio
          },
                  
    ],
      }
};

export default nextConfig;
