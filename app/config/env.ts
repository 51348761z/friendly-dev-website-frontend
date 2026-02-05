const getEnv = (key: string): string => {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};

export const GLOBAL_ENV = {
  API_BASE_URL: getEnv("VITE_API_URL"),
};
