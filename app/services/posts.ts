import type { Post, StrapiPostAttributes, StrapiResponse } from "~/type";
import { request } from "./http";

const DEFAULT_IMAGE = "/images/no-image.png";

const mapPost = (item: StrapiPostAttributes): Post => ({
  id: item.id,
  documentId: item.documentId,
  slug: item.slug,
  title: item.title,
  body: item.body,
  excerpt: item.excerpt,
  date: item.date,
  image: item.image?.url ?? DEFAULT_IMAGE,
});

export async function fetchPosts(options?: { sort?: string }): Promise<Post[]> {
  const json = await request<StrapiResponse<StrapiPostAttributes>>(
    "/api/posts",
    {
      query: {
        populate: "*",
        sort: options?.sort,
      },
    },
  );

  return json.data.map(mapPost);
}

export async function fetchPost(slug: string): Promise<Post> {
  const json = await request<{ data: StrapiPostAttributes }>(
    `/api/posts/${slug}`,
    {
      query: { populate: "*" },
    },
  );

  return mapPost(json.data);
}
