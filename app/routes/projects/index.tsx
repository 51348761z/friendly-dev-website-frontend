import { Link } from "react-router";
import { ProjectCard } from "~/components/ProjectCard";
import type { Route } from "./+types/index";

type loaderReturnType = {
  projects: Project[];
};

export async function loader({
  request,
}: Route.LoaderArgs): Promise<loaderReturnType> {
  const res = await fetch("http://localhost:20001/projects");
  const data: Project[] = await res.json();

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects }: loaderReturnType = loaderData;

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block transform transition duration-300 hover:scale-[1.02]"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
