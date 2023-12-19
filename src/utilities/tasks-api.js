import sendRequest from './send-request';
const BASE_URL = '/api/tasks';

export async function deleteTask(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export async function updateTask(id, updates) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', updates);
}
export async function createTask(taskData) {
    return sendRequest(BASE_URL, "POST", taskData);
  }

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`, "GET");
  }


