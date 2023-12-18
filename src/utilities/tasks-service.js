import * as tasksAPI from "../../utilities/tasks-api";

export async function createTask(taskData) {
    const task = await tasksAPI.createTask(taskData);
    return task;
  }
  