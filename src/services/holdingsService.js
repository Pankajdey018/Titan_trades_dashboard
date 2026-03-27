import axios from "axios";

export const fetchHoldings = async () => {
  const res = await axios.get("http://localhost:3000/allHoldings");
  return res.data;
};