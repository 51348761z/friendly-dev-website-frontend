import { useState } from "react";
import { Link } from "react-router";
import { Pagination } from "~/components/Pagination";
import { ProjectCard } from "~/components/ProjectCard";
import type { Route } from "./+types/index";

export async function loader({ request }: Route.LoaderArgs) {
  const res = await fetch("http://localhost:20001/projects");
  const data: Project[] = await res.json();

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block transform transition duration-300 hover:scale-[1.02]"
          >
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
