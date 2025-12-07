import React, { useEffect, useState } from "react";
import "./ProblemList.css";

const ProblemList = () => {
  const [inputHandle, setInputHandle] = useState("");
  const [handle, setHandle] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedRating, setSelectedRating] = useState("800");
  const [statusMap, setStatusMap] = useState({});
  const [sortOption, setSortOption] = useState("None");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_BASE_URL;

  const ratings = ["800", "900", "1000", "1100", "1200", "1300", "1400"];

  // Load problems by rating
  const fetchProblems = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/problems/${selectedRating}`);
      const data = await res.json();
      setProblems(data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [selectedRating]);

  // Fetch CF submissions when handle changes
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!handle) return;

      try {
        const res = await fetch(
          `https://codeforces.com/api/user.status?handle=${handle}`
        );
        const data = await res.json();

        if (data.status === "OK") {
          setSubmissions(data.result);
        } else {
          setError("Invalid Codeforces handle.");
        }
      } catch (err) {
        console.error("CF API Error:", err);
        setError("Failed to fetch submissions.");
      }
    };

    fetchSubmissions();
  }, [handle]);

  // Build verdict map
  useEffect(() => {
    const verdictMap = {};
    for (let sub of submissions) {
      const link = `https://codeforces.com/problemset/problem/${sub.problem.contestId}/${sub.problem.index}`;
      if (sub.verdict === "OK") verdictMap[link] = "AC";
      else if (!verdictMap[link]) {
        if (["WRONG_ANSWER", "RUNTIME_ERROR"].includes(sub.verdict))
          verdictMap[link] = "WA";
        else if (sub.verdict === "TIME_LIMIT_EXCEEDED")
          verdictMap[link] = "TLE";
      }
    }
    setStatusMap(verdictMap);
  }, [submissions]);

  const getStatus = (link) => statusMap[link] || "X";

  const getStatusClass = (status) =>
    status === "AC"
      ? "status-ac"
      : status === "WA"
      ? "status-wa"
      : status === "TLE"
      ? "status-tle"
      : "status-x";

  const getRowClass = (status) =>
    status === "AC"
      ? "row-ac"
      : status === "WA"
      ? "row-wa"
      : status === "TLE"
      ? "row-tle"
      : "";

  const getSortedProblems = () => {
    let sorted = [...problems];
    if (sortOption === "Level") {
      sorted.sort((a, b) => Number(a.Level) - Number(b.Level));
    } else if (sortOption === "Status") {
      const order = { AC: 0, WA: 1, TLE: 2, X: 3 };
      sorted.sort(
        (a, b) => order[getStatus(a.Link)] - order[getStatus(b.Link)]
      );
    }
    return sorted;
  };

  // Handle Submit or Clear
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitted) {
      // ---- CLEAR HANDLE ----
      setIsSubmitted(false);
      setHandle("");
      setInputHandle("");
      setSubmissions([]);
      setStatusMap({});
      setError("");
      return;
    }

    // ---- SUBMIT HANDLE ----
    const trimmed = inputHandle.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${trimmed}`
      );
      const data = await res.json();

      if (data.status === "OK") {
        setHandle(trimmed);
        setSubmissions(data.result);
        localStorage.setItem("cf_handle", trimmed);
        setIsSubmitted(true);

        // Update counters
        const res2 = await fetch(`${BASE_URL}/api/user/count-user`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle: trimmed }),
        });

        const countData = await res2.json();
        setTotalCount(countData.total);
        setUserCount(countData.user);
      } else {
        setError("Invalid Codeforces handle.");
      }
    } catch (err) {
      setError("Failed to fetch submissions.");
    }

    setLoading(false);
  };

  return (
    <div className="problem-list-container">
      <h2>📈Problem Ladder</h2>

      {/* Input Form */}
      <form className="handle-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Codeforces handle"
          value={inputHandle}
          onChange={(e) => setInputHandle(e.target.value)}
          disabled={isSubmitted}
        />

        <button type="submit">
          {isSubmitted ? "Clear Handle" : "Submit Handle"}
        </button>
      </form>

      {/* Counter Boxes */}
      {totalCount !== null && userCount !== null && (
        <div className="count-popup-boxes">
          <div className="count-box">
            <strong>📞 Total Calls:</strong> {totalCount}
          </div>
          <div className="count-box">
            <strong>🙋🏻‍♂️ Your Calls:</strong> {userCount}
          </div>
        </div>
      )}

      {/* Rating Tabs */}
      <div className="rating-tabs">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={selectedRating === rating ? "active" : ""}
          >
            {rating}
          </button>
        ))}
      </div>

      {/* Error */}
      {loading && <p>Fetching submissions...</p>}
      {error && <p className="error">{error}</p>}

      {/* Sort */}
      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Level">Level</option>
          <option value="Status">Status</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-contrainer">
        <table className="problem-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Level</th>
              <th>Knowledge</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {getSortedProblems().map((prob, idx) => {
              const status = getStatus(prob.Link);
              return (
                <tr key={prob._id} className={getRowClass(status)}>
                  <td>{idx + 1}</td>
                  <td>
                    <a href={prob.Link} target="_blank" rel="noreferrer">
                      {prob.Name}
                    </a>
                  </td>
                  <td>{prob.Tags}</td>
                  <td>{prob.Level}</td>
                  <td>{prob.Knowledge}</td>
                  <td className={getStatusClass(status)}>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="progress-note">
        ✅ AC | ❌ WA | ⏱️ TLE | ❓ X (Not Attempted)
      </p>
    </div>
  );
};

export default ProblemList;
