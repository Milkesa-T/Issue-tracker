import React, { useState } from "react";
import { createIssue } from "../api";

interface Props {
  onIssueAdded: () => void;
}

const IssueForm: React.FC<Props> = ({ onIssueAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FIXED: Added the 'status' property required by the createIssue type definition
    await createIssue({ 
      title, 
      description, 
      priority, 
      status: "Open" // Add a default status here
    });

    // Optional: Instead of window.location.reload(), just reset state and notify parent
    setTitle("");
    setDescription("");
    setPriority("Medium");
    
    onIssueAdded();
    // window.location.reload(); // Usually not needed if onIssueAdded refreshes the list
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Create Issue</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Issue</button>
    </form>
  );
};

export default IssueForm;
