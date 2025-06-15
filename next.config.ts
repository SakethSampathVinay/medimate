
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com', 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.internationaldrugmart.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'surli.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'surl.li',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.aspirin.ca',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.poison.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
