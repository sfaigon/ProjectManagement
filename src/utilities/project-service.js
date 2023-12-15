import * as projectsAPI from "./projects-api";

export async function createProject(projectData) {
  const project = await projectsAPI.createProject(projectData);
  return project;
}
