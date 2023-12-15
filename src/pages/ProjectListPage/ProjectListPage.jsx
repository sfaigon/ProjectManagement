import ProjectItem from "../../components/ProjectItem/ProjectItem";

export default function ProjectListPage() {
  return (
    <>
      <h1>Project List Page</h1>;
      <ul>
        {ProjectListPage.map((p, idx) => (
          <ProjectItem project={p} idx={idx} key={idx} />
        ))}
      </ul>
    </>
  );
}
