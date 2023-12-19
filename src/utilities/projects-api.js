import sendRequest from "./send-request";
const BASE_URL = "/api/projects";

export async function createProject(projectData) {
  return sendRequest(BASE_URL, "POST", projectData);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getOne(projectData) {
  return sendRequest(`${BASE_URL}/${projectData}`, "GET");
}

