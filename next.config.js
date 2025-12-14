const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
});

module.exports = withPWA({
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    GOOGLE_MAPS_API_KEY: process.env.MAP_API_KEY,
  },
  publicRuntimeConfig: {
    GOOGLE_MAPS_API_KEY: process.env.MAP_API_KEY,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        child_process: false,
        https: false,
        os: false,
        path: false,
        crypto: false,
        http2: false,
        zlib: false,
        net: false,
        tls: false,
        http: false,
        stream: false,
        request: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/search-by-make/Toyota/4Runner/Ignition%20%26%20Electrical/Spark%20Plug-Toyota-4Runner-2002-2009-90919-01235-25",
        destination: "/search-by-make/Toyota/4Runner/Ignition%20%26%20Electrical/Spark%20Plug/Spark%20Plug-Toyota-4Runner-2002-2009-90919-01235-25",
        permanent: true
      },
      {
        source: "/search-by-make/Toyota/RAV4/Ignition%20&%20Electrical/Spark%20Plug-Toyota-RAV4-2001-2003-90919-01210-26",
        destination: "/search-by-make/Toyota/RAV4/Ignition%20&%20Electrical/Spark%20Plug/Spark%20Plug-Toyota-RAV4-2001-2003-90919-01210-26",
        permanent: true
      },
      {
        source: "/search-by-make/Renault/Symbol%202/Ignition%20&%20Electrical/Spark%20Plug-Renault-Symbol%202-2008-2012-7700500168-1",
        destination: "/search-by-make/Renault/Symbol%202/Ignition%20&%20Electrical/Spark%20Plug/Spark%20Plug-Renault-Symbol%202-2008-2012-7700500168-1",
        permanent: true
      },
      {
        source: "/search-by-make/Volkswagen/Touareg/Suspension%20&%20Steering%20Parts/Front%20Lower%20Arm%20Ball%20Joint-Volkswagen-Touareg-2019-2022-4M0407689C-22",
        destination: "/search-by-make/Volkswagen/Touareg/Suspension%20&%20Steering%20Parts/Suspension/Front%20Lower%20Arm%20Ball%20Joint-Volkswagen-Touareg-2019-2022-4M0407689C-22",
        permanent: true
      },
      {
        source: "/search-by-make/Renault/Duster/Wiring%20&%20Harness/Fuse%20Box%20set-Renault-Duster-2010-2015-243800196R-8",
        destination: "/search-by-make/Renault/Duster/Wiring%20&%20Harness/Fuse%20Box/Fuse%20Box%20set-Renault-Duster-2010-2015-243800196R-8",
        permanent: true
      },
      {
        source: "/search-by-make/Volkswagen/Touareg/Suspension%20%26%20Steering%20Parts/Front%20Lower%20Arm%20Ball%20Joint-Volkswagen-Touareg-2019-2022-4M0407689C-22",
        destination: "/search-by-make/Volkswagen/Touareg/Suspension%20%26%20Steering%20Parts/Suspension/Front%20Lower%20Arm%20Ball%20Joint-Volkswagen-Touareg-2019-2022-4M0407689C-22",
        permanent: true
      },
      {
        source: "/search-by-make/Audi/TT%20Quattro/Cooling%20System/Engine%20Water%20Pump%20with%20Gasket%20and%20Temp%20sensor-Audi-TT%20Quattro-2009-2015-06H121026DR-23",
        destination: "/search-by-make/Audi/TT%20Quattro/Cooling%20System/Water%20Pump/Engine%20Water%20Pump%20with%20Gasket%20and%20Temp%20sensor-Audi-TT%20Quattro-2009-2015-06H121026DR-23",
        permanent: true
      }
    ];
  },
  staticPageGenerationTimeout: 3000,
});
