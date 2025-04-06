import React, { useEffect, useState } from "react";
import "./ProblemList.css";

const ProblemList = () => {
  const [inputHandle, setInputHandle] = useState("");
  const [handle, setHandle] = useState(""); // actual used after submit
  const [submissions, setSubmissions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedRating, setSelectedRating] = useState("800");
  const [statusMap, setStatusMap] = useState({});
  const [sortOption, setSortOption] = useState("None");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ratings = ["800", "900", "1000", "1100", "1200", "1300", "1400"];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch(`/api/problems/${selectedRating}`);
        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };
    fetchProblems();
  }, [selectedRating]);

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
          console.error("Invalid CF handle or API error");
        }
      } catch (err) {
        console.error("CF API Error:", err);
      }
    };
    fetchSubmissions();
  }, [handle]);

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

  const getStatus = (link) => {
    return statusMap[link] || "X";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "AC":
        return "status-ac";
      case "WA":
        return "status-wa";
      case "TLE":
        return "status-tle";
      default:
        return "status-x";
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("cf_handle");
    if (saved) {
      setInputHandle(saved);
      setHandle(saved);
    }
  }, []);

  const getRowClass = (status) => {
    switch (status) {
      case "AC":
        return "row-ac";
      case "WA":
        return "row-wa";
      case "TLE":
        return "row-tle";
      default:
        return "";
    }
  };

  const getSortedProblems = () => {
    let sorted = [...problems];
    if (sortOption === "Level") {
      sorted.sort((a, b) => Number(a.Level) - Number(b.Level));
    } else if (sortOption === "Status") {
      const statusOrder = { AC: 0, WA: 1, TLE: 2, X: 3 };
      sorted.sort(
        (a, b) =>
          statusOrder[getStatus(a.Link)] - statusOrder[getStatus(b.Link)]
      );
    }
    return sorted;
  };

  return (
    <div className="problem-list-container">
      <h2>📈Problem Ladder</h2>

      <form
        className="handle-form"
        onSubmit={async (e) => {
          e.preventDefault();
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
              setHandle(trimmed); // save to state
              setSubmissions(data.result);
              localStorage.setItem("cf_handle", trimmed); // ✅ remember it
            } else {
              setError("Invalid Codeforces handle.");
              setSubmissions([]);
            }
          } catch (err) {
            console.error("CF API Error:", err);
            setError("Failed to fetch submissions.");
          }
          setLoading(false);
        }}
      >
        <input
          type="text"
          placeholder="Enter your Codeforces handle"
          value={inputHandle}
          onChange={(e) => setInputHandle(e.target.value)}
        />
        <button type="submit">Set Handle</button>
      </form>

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

      {loading && <p>Fetching submissions...</p>}
      {error && <p className="error">{error}</p>}

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
          {getSortedProblems().map((prob, idx) => (
            <tr key={prob._id} className={getRowClass(getStatus(prob.Link))}>
              <td>{idx + 1}</td>
              <td>
                <a href={prob.Link} target="_blank" rel="noreferrer">
                  {prob.Name}
                </a>
              </td>
              <td>{prob.Tags}</td>
              <td>{prob.Level}</td>
              <td>{prob.Knowledge}</td>
              <td className={getStatusClass(getStatus(prob.Link))}>
                {getStatus(prob.Link)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="progress-note">
        ✅ AC | ❌ WA | ⏱️ TLE | ❓ X (Not Attempted)
      </p>
    </div>
  );
};

export default ProblemList;
