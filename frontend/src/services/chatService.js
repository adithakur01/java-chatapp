import axios from "axios";
import { auth } from "../firebase/config";

const BASE_URL = "http://localhost:8080/api";

// Token header helper
const getAuthHeader = async () => {
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

// Last 50 messages fetch karo
export const fetchMessages = async () => {
  const headers = await getAuthHeader();
  const res = await axios.get(`${BASE_URL}/messages`, { headers });
  return res.data;
};