import axios from "axios";
import { auth } from "../firebase/config";

const BASE_URL = "http://localhost:8080/api";

const getAuthHeader = async () => {
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

export const sendSMS = async (phone, message, senderName) => {
  const headers = await getAuthHeader();
  const res = await axios.post(`${BASE_URL}/sms/send`,
    { phone, message, senderName },
    { headers }
  );
  return res.data;
};