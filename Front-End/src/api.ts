import axios from "axios";

const API_URL = "http://localhost:5000/issues";

export const getIssues = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createIssue = async (issue: {
  title: string;
  description: string;
  priority: string;
  status: string;
}) => {
  const res = await axios.post(API_URL, issue);
  return res.data;
};
