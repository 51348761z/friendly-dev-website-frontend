import { GLOBAL_ENV } from "./env";

export const API_ENDPOINTS = {
  projects: `${GLOBAL_ENV.API_BASE_URL}/projects`,
  project: (id: number | string) => `${GLOBAL_ENV.API_BASE_URL}/projects/${id}`,
  posts: `${GLOBAL_ENV.API_BASE_URL}/posts?populate=*`,
  post: (slug: string) => `${GLOBAL_ENV.API_BASE_URL}/posts/${slug}`,
};

export const STRAPI_ENDPOINTS = {
  baseUrl: GLOBAL_ENV.STRAPI_BASE_URL,
};
