/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://192.168.29.38:3000", // your LAN IP
    "http://localhost:3000",     // optional local access
  ],
};

export default nextConfig;
