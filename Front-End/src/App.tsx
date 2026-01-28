import { useEffect, useState } from "react";
import "./App.css";
import IssueList from "./components/IssueList";
import { getIssues, createIssue } from "./api";

function App() {
  const [issues, setIssues] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("open");

  const loadIssues = async () => {
    const data = await getIssues();
    setIssues(data);
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await createIssue({ title, description, priority, status });
    loadIssues();

    setTitle("");
    setDescription("");
  };

  return (
    <div className="container">
      <h1>🚀 Issue Tracker</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Issue title"
          required
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />

        <select onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select onChange={e => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <button>Add Issue</button>
      </form>

      <IssueList issues={issues} />
    </div>
  );
}

export default App;
