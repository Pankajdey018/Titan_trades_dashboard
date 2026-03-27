import axios from "axios";

export const fetchPositions = async () => {
  const res = await axios.get("http://localhost:3000/positions");
  return res.data;
};