interface Issue {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

const IssueList = ({ issues }: { issues: Issue[] }) => {
  return (
    <>
      {issues.map(issue => (
        <div className={`card ${issue.status}`} key={issue.id}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <span className="badge">{issue.priority}</span>
          <span className="status">{issue.status}</span>
        </div>
      ))}
    </>
  );
};

export default IssueList;
