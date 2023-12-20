import sendRequest from "./send-request";
const BASE_URL = "/api/projects";

export async function deleteProject(id) {
  return sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

export async function createProject(projectData) {
  return sendRequest(BASE_URL, "POST", projectData);
}

export async function updateProject(id, updates) {
  console.log(updates);
  return sendRequest(`${BASE_URL}/${id}`, "PUT", updates);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

// export async function getOne(projectData) {
//   return sendRequest(`${BASE_URL}/${projectData}`, "GET");
// }

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`, "GET");
}
