import { AboutPreview } from "~/components/AboutPreview";
import { FeaturedProjects } from "~/components/FeaturedProjects";
import { LatestPosts } from "~/components/LatestPosts";
import { API_ENDPOINTS, STRAPI_ENDPOINTS } from "~/config/api";
import type {
  Post,
  Project,
  StrapiPostAttributes,
  StrapiProjectAttributes,
  StrapiResponse,
} from "~/type";
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
      fetch(`${API_ENDPOINTS.projects}?populate=*`),
      fetch(API_ENDPOINTS.posts + "&sort=date:desc"),
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

    const [projectData, postData]: [
      StrapiResponse<StrapiProjectAttributes>,
      StrapiResponse<StrapiPostAttributes>,
    ] = await Promise.all([projectsRes.json(), postRes.json()]);

    return {
      projects: projectData.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url
          ? `${STRAPI_ENDPOINTS.baseUrl}${item.image.url}`
          : "/images/no-image.png",
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
      })) satisfies Project[],

      posts: postData.data.map((item) => ({
        id: item.id,
        documentId: item.documentId,
        slug: item.slug,
        title: item.title,
        body: item.body,
        excerpt: item.excerpt,
        date: item.date,
        image: item.image?.url
          ? `${STRAPI_ENDPOINTS.baseUrl}${item.image.url}`
          : "/images/no-image.png",
      })) satisfies Post[],
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
