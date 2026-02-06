import { Link } from "react-router";
import type { Project } from "~/type";
import { ProjectCard } from "./ProjectCard";

type FeaturedProjectsProps = {
  projects: Project[];
  count: number;
};
export const FeaturedProjects = ({
  projects,
  count = 4,
}: FeaturedProjectsProps) => {
  const featureds = projects.filter((p) => p.featured).slice(0, count);

  if (featureds.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-6 to-gray-200 text-2xl font-bold text-white">
        🌟 Featured Projects
      </h2>

      <ul className="grid gap-6 sm:grid-cols-2">
        {featureds.map((project) => (
          <li key={project.id}>
            <Link
              to={`/projects/${project.documentId}`}
              className="block transform transition duration-300 hover:scale-[1.02]"
            >
              <ProjectCard project={project} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
