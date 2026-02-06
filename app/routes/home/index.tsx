import { AboutPreview } from "~/components/AboutPreview";
import { FeaturedProjects } from "~/components/FeaturedProjects";
import { LatestPosts } from "~/components/LatestPosts";
import { fetchPosts } from "~/services/posts";
import { fetchProjects } from "~/services/projects";
import type { Post, Project } from "~/type";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Welcome" },
    { name: "description", content: "A friendly website." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  try {
    const [projects, posts] = await Promise.all([
      fetchProjects(),
      fetchPosts({ sort: "date:desc" }),
    ]);

    return {
      projects: projects satisfies Project[],
      posts: posts satisfies Post[],
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
