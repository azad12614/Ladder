import React, { useState, useEffect } from "react";
import "./ProblemList.css";

const ProblemList = ({ propsValue }) => {
  const [tables, setTables] = useState([]);
  const [handle, setHandle] = useState(propsValue[0] || "");
  const [apiCallFailed, setApiCallFailed] = useState(false); // Track if API call failed
  const Api = `https://codeforces.com/api/user.status?handle=${handle}`;
  const URL = propsValue[2];

  useEffect(() => {
    // Reset the failed status when the handle changes
    setApiCallFailed(false);

    const fetchData = async () => {
      // First, check if the API call has failed previously
      if (apiCallFailed || propsValue[1] != 800) {
        // If failed, just fetch the problems from the local API
        console.log(
          "Fetching problems from local API due to previous failure."
        );
        fetchLocalProblems();
        return;
      }

      try {
        const userStatusResponse = await fetch(Api);
        const userStatusData = await userStatusResponse.json();

        if (userStatusData.status !== "OK") {
          // If the Codeforces API returns an error, set the flag to true
          setApiCallFailed(true);
          console.error("Codeforces API call failed:", userStatusData);
          fetchLocalProblems(); // Fallback to local API if Codeforces fails
          return;
        }

        const userProblems = userStatusData.result;

        // Fetch problems from local API
        const allProblemsResponse = await fetch(`${URL}/all-${propsValue[1]}`);
        const allProblemsData = await allProblemsResponse.json();

        let table = "";
        let i = 1;

        allProblemsData.forEach((problem) => {
          const problemLink = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
          const status = userProblems.find((userProblem) => {
            const userProblemLink = `https://codeforces.com/problemset/problem/${userProblem.problem.contestId}/${userProblem.problem.index}`;
            return userProblemLink === problem.Link;
          });

          const verdict = status ? status.verdict : null;
          let verdictClass = "";
          if (verdict === "OK") {
            verdictClass = "ac"; // AC - Accepted
          } else if (verdict === "WRONG_ANSWER") {
            verdictClass = "wa"; // WA - Wrong Answer
          } else {
            verdictClass = "x"; // X - Not Solved
          }

          table += `
            <tr class="problem-row">
              <td class="border-1 border-black">${i}</td>
              <td class="border-1 border-black"><a href="${
                problem.Link
              }" target="_blank" class='link link-primary'>${
            problem.Name
          }</a></td>
              <td class="border-1 border-black">${problem.Tags}</td>
              <td class="border-1 border-black">${problem.Level}</td>
              <td class="border-1 border-black">${problem.Knowledge}</td>
              <td class="border-1 border-black ${verdictClass}">${
            verdict ? verdict : "X"
          }</td>
            </tr>
          `;
          i++;
        });
        setTables(table);
      } catch (error) {
        // If the Codeforces API call fails, we will handle it gracefully
        console.error("Error with Codeforces API:", error);
        setApiCallFailed(true);
        fetchLocalProblems(); // Fallback to local API if error occurs
      }
    };

    const fetchLocalProblems = async () => {
      try {
        const allProblemsResponse = await fetch(`${URL}/all-${propsValue[1]}`);
        const allProblemsData = await allProblemsResponse.json();

        // Sorting the problems by Level (difficulty)
        allProblemsData.sort((a, b) => a.Level - b.Level);

        let table = "";
        let i = 1;
        allProblemsData.forEach((problem) => {
          table += `
            <tr>
              <td class="border-1 border-black">${i}</td>
              <td class="border-1 border-black"><a href="${problem.Link}" target="_blank" class="link link-primary">${problem.Name}</a></td>
              <td class="border-1 border-black">${problem.Tags}</td>
              <td class="border-1 border-black">${problem.Level}</td>
              <td class="border-1 border-black">${problem.Knowledge}</td>
              <td class="border-1 border-black">X</td>
            </tr>
          `;
          i++;
        });
        setTables(table);
      } catch (error) {
        console.error("Error with local API:", error);
      }
    };

    fetchData();
  }, [handle, propsValue]); // Fetch only when `handle` changes

  return (
    <div className="table-container">
      <table className="problem-table">
        <thead>
          <tr className="text-center">
            <th className="border-2 border-blue">No.</th>
            <th className="border-2 border-blue">Problem</th>
            <th className="border-2 border-blue">Tags</th>
            <th className="border-2 border-blue">Difficulty Level</th>
            <th className="border-2 border-blue">Required Knowledge</th>
            <th className="border-2 border-blue">Status</th>
          </tr>
        </thead>
        <tbody dangerouslySetInnerHTML={{ __html: tables }} />
      </table>
    </div>
  );
};

export default ProblemList;
