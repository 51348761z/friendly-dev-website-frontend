import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { API_ENDPOINTS } from "~/config/api";
import type { Project, StrapiProjectAttributes } from "~/type";
import type { Route } from "./+types/details";

export async function loader({ params }: Route.LoaderArgs) {
  const res = await fetch(`${API_ENDPOINTS.project(params.id)}?populate=*`);
  if (!res.ok) {
    throw new Response("Failed to fetch project", { status: res.status });
  }

  const { data }: { data: StrapiProjectAttributes } = await res.json();
  return {
    id: data.id,
    documentId: data.documentId,
    title: data.title,
    description: data.description,
    image: data.image ? data.image.url : "/images/no-image.png",
    url: data.url,
    date: data.date,
    category: data.category,
    featured: data.featured,
  } satisfies Project;
}

const DetailsPage = ({ loaderData: project }: Route.ComponentProps) => {
  return (
    <>
      <nav>
        <Link
          to="/projects"
          className="mb-6 flex items-center text-blue-400 capitalize transition hover:text-blue-500"
        >
          <FaArrowLeft className="mr-2" /> Back to projects
        </Link>
      </nav>

      <article className="grid items-start gap-8 md:grid-cols-2">
        <figure>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </figure>

        <section>
          <h1 className="mb-4 text-3xl font-bold text-blue-400">
            {project.title}
          </h1>
          <p className="mb-4 to-gray-300 text-sm">
            {`${new Date(project.date).toLocaleDateString("zh-CN")} -
            ${project.category}`}
          </p>
          <p className="mb-6 text-gray-200">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Visit Project <FaArrowRight className="ml-2 inline" />
          </a>
        </section>
      </article>
    </>
  );
};

export default DetailsPage;
