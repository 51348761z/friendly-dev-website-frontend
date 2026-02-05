import { AboutPreview } from "~/components/AboutPreview";
import { FeaturedProjects } from "~/components/FeaturedProjects";
import { API_ENDPOINTS } from "~/config/api";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Welcome" },
    { name: "description", content: "A friendly website." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const res = await fetch(API_ENDPOINTS.projects);
  if (!res.ok) {
    throw new Response("Failed to fetch projects", { status: res.status });
  }

  const data: Project[] = await res.json();
  return data;
}

export default function HomePage({
  loaderData: projects,
}: Route.ComponentProps) {
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
}
