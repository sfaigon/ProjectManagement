import sendRequest from "./send-request";
const BASE_URL = "/api/comments";

export async function createComment(commentData) {
  return sendRequest(BASE_URL, "POST", commentData);
}

export async function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`, "GET");
}


export async function deleteComment(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function updateComment(id, updates) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', updates);
}
