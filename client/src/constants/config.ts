const config = {
  baseUrl:
    `${import.meta.env.VITE_ENVIRONMENT as string}` === "development"
      ? `${import.meta.env.VITE_DEV_BACKEND_URL as string}`
      : `${import.meta.env.VITE_PRODUCTION_BACKEND_URL as string}`,
};

export default config;
