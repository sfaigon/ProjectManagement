export default function TaskDetail({ task }) {
    return (
        <>
        <h2>{task.title}</h2>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Date Assigned:</strong> {formatDate(task.dateAssigned)}</p>
        <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
        <p><strong>Stage:</strong> {task.stage}</p>
        </>
    )
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}