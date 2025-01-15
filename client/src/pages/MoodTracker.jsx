/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { submitPHQ9, fetchPHQ9Result } from "../apiService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PHQ9 = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      toast.error("Please Login or Sign Up");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay navigation by 1 second
    }
  }, [user, navigate]);

  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead or of hurting yourself in some way?",
  ];

  const answerOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill(0));
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [severity, setSeverity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState(null);

  const userId = user?._id;
  const token = user?.token;

  const calculateSeverity = (score) => {
    if (score <= 4) return "Minimal or None";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately Severe";
    return "Severe";
  };

  const fetchChartData = async () => {
    try {
      const result = await fetchPHQ9Result(userId, date);
      if (result && result.data) {
        const responses = result.data.responses || [];
        const data = responses.reduce(
          (acc, response) => {
            acc[response] = (acc[response] || 0) + 1;
            return acc;
          },
          [0, 0, 0, 0]
        );

        setChartData({
          labels: answerOptions.map((option) => option.label),
          datasets: [
            {
              data,
              backgroundColor: ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"],
              borderColor: ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"],
              borderWidth: 1,
            },
          ],
        });
      } else {
        toast.info("No chart data available.");
      }
    } catch (err) {
      toast.error("Failed to fetch chart data.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChartData();
    }
  }, [userId, date]);

  const handleSubmit = async () => {
    try {
      const score = responses.reduce((a, b) => a + b, 0);
      const severityLevel = calculateSeverity(score);

      await submitPHQ9(userId, date, responses, token);

      setSeverity(severityLevel);
      setShowModal(true);
      toast.success("Response saved successfully");
      fetchChartData(); // Refresh chart data after submission
    } catch (err) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-7">
      <ToastContainer />
      <h1 className="md:text-4xl text-lg font-bold mb-6 text-cyan-400 text-center">
        PHQ-9 Assessment: Depression Severity Check
      </h1>

      {/* Grid layout for larger screens (9 columns for questions, 3 columns for chart) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Questions Section */}
        <div className="md:col-span-7 p-5 shadow-lg shadow-pink-400 bg-neutral-950 rounded-lg">
          <div className="bg-neutral-950 p-4 md:max-w-2xl m-auto rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Answer the Questions</h2>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium mb-2 text-sky-400">
                  {index + 1}. {question}
                </p>
                <div className="flex flex-wrap gap-4">
                  {answerOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer p-2 border rounded-lg ${
                        responses[index] === option.value
                          ? "bg-blue-500 text-white"
                          : "bg-neutral-900 text-white"
                      }`}
                      onClick={() => {
                        const newResponses = [...responses];
                        newResponses[index] = option.value;
                        setResponses(newResponses);
                      }}
                    >
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} className="btn btn-active btn-secondary">
            Submit Responses
          </button>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-5 mt-8 p-5 shadow-lg shadow-pink-400 bg-neutral-950 rounded-lg min-h-[300px]">
  {chartData ? (
    <div className="flex flex-col justify-center items-center h-full">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
        width={200}   // Adjust width for larger screens
        height={200}  // Adjust height for larger screens
      />
      <h2 className="text-xl mt-4 font-bold mb-4 text-sky-400 text-center">
        Severity data for {new Date(date).toLocaleDateString()}
      </h2>
    </div>
  ) : (
    <p className="text-gray-400 text-center">Loading chart data...</p>
  )}
</div>

      </div>

      {/* Modal for showing severity */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-neutral-800 text-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Depression Severity</h2>
            <p className="text-xl font-bold mb-2">{severity}</p>
            <p className="text-sm text-gray-400">
              Date: <span className="font-medium text-gray-300">{date}</span>
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
              >
                Close
              </button>
            </div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PHQ9;
