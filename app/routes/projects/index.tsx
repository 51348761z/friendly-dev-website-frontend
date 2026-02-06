import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";
import { CategoryFilter } from "~/components/CategoryFilter";
import { Pagination } from "~/components/Pagination";
import { ProjectCard } from "~/components/ProjectCard";
import { fetchProjects } from "~/services/projects";
import type { Project } from "~/type";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev Website | Projects" },
    {
      name: "description",
      content:
        "Browse through a collection of projects showcasing various skills and technologies.",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const projects = await fetchProjects();
  return { projects } satisfies { projects: Project[] };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { projects } = loaderData;
  const projectsPerPage = 10;

  // Get uniq categories
  const categories = [
    "all",
    ...new Set(projects.map((p) => p.category.toLowerCase())),
  ];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold text-white">🚀 Projects</h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      />

      <AnimatePresence mode="wait">
        <motion.ul
          layout
          aria-label="Project list"
          className="grid gap-6 sm:grid-cols-2"
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {currentProjects.map((project) => (
            <motion.li key={project.id} layout>
              <Link
                to={`/projects/${project.documentId}`}
                className="block transform transition duration-300 hover:scale-[1.02]"
              >
                <ProjectCard project={project} />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
