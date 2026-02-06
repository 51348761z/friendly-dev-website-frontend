import type { Project, StrapiProjectAttributes, StrapiResponse } from "~/type";
import { request } from "./http";

const DEFAULT_IMAGE = "/images/no-image.png";

const mapProject = (item: StrapiProjectAttributes): Project => ({
  id: item.id,
  documentId: item.documentId,
  title: item.title,
  description: item.description,
  image: item.image?.url ?? DEFAULT_IMAGE,
  url: item.url,
  date: item.date,
  category: item.category,
  featured: item.featured,
});

export async function fetchProjects(): Promise<Project[]> {
  const json = await request<StrapiResponse<StrapiProjectAttributes>>(
    "/api/projects",
    {
      query: { populate: "*" },
    },
  );

  return json.data.map(mapProject);
}

export async function fetchProject(id: string | number): Promise<Project> {
  const json = await request<{ data: StrapiProjectAttributes }>(
    `/api/projects/${id}`,
    {
      query: { populate: "*" },
    },
  );

  return mapProject(json.data);
}
