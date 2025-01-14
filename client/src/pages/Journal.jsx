/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load entries from local storage or API on component mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    if (!currentEntry.trim()) {
      setError("Your journal entry cannot be empty.");
      return;
    }

    const newEntry = { date, content: currentEntry };
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    setCurrentEntry("");
    setError(null);
    setShowSuccess(true);

    // Save to local storage or API
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

    setTimeout(() => setShowSuccess(false), 2000); // Hide success message after 2 seconds
  };

  const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  return (
    <div className="p-6 dark:bg-neutral-900  min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Your Personal Journal
      </h1>

      <div className="bg-white dark:bg-neutral-700 shadow-lg md:max-w-3xl m-auto rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
          Write Your Thoughts
        </h2>
        <textarea
          className="w-full h-36 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="What's on your mind today?"
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleSave}
            className="btn btn-info"
          >
            Save Entry
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        {showSuccess && (
          <div role="alert" className="alert alert-success w-auto">
         
          <span className="font-bold">Entry Saved Successfully</span>
        </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl  mt-7 text-center text-gray-700 font-bold dark:text-pink-500 mb-4">
          Your Journal Entries
        </h2>
        {entries.length > 0 ? (
          <div className="space-y-6 overflow-y-scroll h-96 mb-7">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-950 md:max-w-3xl m-auto shadow-lg rounded-lg p-5 border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">{entry.date}</p>
                    <p className="text-gray-700 dark:text-white mt-3">{entry.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-600 hover:underline text-sm"
                  >
                    <MdDelete size={28} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 font-semibold text-center">
            No entries yet. Start writing your first one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Journal;
