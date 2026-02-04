type ProjectCartProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCartProps) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-sm transition hover:shadow-md">
      <img
        src={project.image}
        alt={project.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="mb-1 text-3xl font-semibold text-blue-400">
          {project.title}
        </h3>
        <p className="mb-2 line-clamp-1 text-sm text-gray-300">
          {project.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{project.category}</span>
          <time>{new Date(project.date).toLocaleDateString("zh-CN")}</time>
        </div>
      </div>
    </article>
  );
};
