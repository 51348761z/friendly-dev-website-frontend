import { GLOBAL_ENV } from "~/config/env";

type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

interface RequestOptions extends RequestInit {
  query?: QueryParams;
}

const buildUrl = (path: string, query?: QueryParams): string => {
  const url = path.startsWith("http")
    ? new URL(path)
    : new URL(path, GLOBAL_ENV.API_BASE_URL);

  if (query) {
    const searchParams = new URLSearchParams(url.search);

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      searchParams.set(key, String(value));
    });

    url.search = searchParams.toString();
  }

  return url.toString();
};

export async function request<T>(
  path: string,
  { query, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const res = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Response(`Request failed: ${res.statusText}`, {
      status: res.status,
    });
  }

  return res.json() as Promise<T>;
}
