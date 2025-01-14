import axios from 'axios'

const submitPHQ9 = async (userId, date, responses, token) => {
  const response = await axios.post(
    "http://localhost:7643/phq9/submit",
    { userId, date, responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Fetch PHQ-9 Result

 const fetchPHQ9Result = async (userId, date, token) => {
  const response = await axios.get("http://localhost:7643/phq9/result", {
    params: { userId, date },
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
};
  
  export { submitPHQ9, fetchPHQ9Result };
   