const config = {
  baseUrl:
    `${import.meta.env.VITE_ENVIRONMENT}` === "development"
      ? `${import.meta.env.VITE_DEV_BACKEND_URL}`
      : `${import.meta.env.VITE_PRODUCTION_BACKEND_URL}`,
};

export default config;
