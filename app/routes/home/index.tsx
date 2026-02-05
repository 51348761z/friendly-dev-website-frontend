import { AboutPreview } from "~/components/AboutPreview";
import { FeaturedProjects } from "~/components/FeaturedProjects";
import { LatestPosts } from "~/components/LatestPosts";
import { API_ENDPOINTS } from "~/config/api";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Welcome" },
    { name: "description", content: "A friendly website." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const url = new URL(request.url);
    const [projectsRes, postRes] = await Promise.all([
      fetch(API_ENDPOINTS.projects),
      fetch(new URL("/posts-meta.json", url).href),
    ]);

    if (!projectsRes.ok) {
      throw new Response("Failed to fetch projects", {
        status: projectsRes.status,
      });
    }
    if (!postRes.ok) {
      throw new Response("Failed to fetch blog posts", {
        status: postRes.status,
      });
    }

    const [projectData, postData]: [Project[], PostMeta[]] = await Promise.all([
      projectsRes.json(),
      postRes.json(),
    ]);

    return {
      projects: projectData,
      posts: postData,
    };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    throw new Response("Unexpected error", { status: 500 });
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={3} />
    </>
  );
}
