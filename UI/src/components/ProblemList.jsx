import React from "react";
import { useState, useEffect } from "react";

// const URL = `http://localhost:3000`;
const URL = `https://ladder-backend.onrender.com`;

export default ({ propsValue }) => {
  var f = 0,
    i = 1,
    j = 0,
    table = ``;

  const Api = `https://codeforces.com/api/user.status?handle=${propsValue[0]}`;

  const [tables, setTables] = useState([]);

  var list = [];

  useEffect(() => {
    try {
      fetch(Api)
        .then((data) => {
          return data.json();
        })
        .then((info) => {
          return info.result;
        })
        .then((value) => {
          value.map((P) => {
            list[j] = [];
            list[j][0] = P.problem.contestId;
            list[j][1] = P.problem.index;
            list[j][2] = P.verdict;
            j++;
          });
        });
    } catch (error) {}

    list.sort;

    const Get = async () => {
      try {
        await fetch(`${URL}/all-${propsValue[1]}`)
          .then((data) => {
            return data.json();
          })
          .then((list2) => {
            list2.map((problem2) => {
              if (list.length) {
                // console.log("hello");
                list.map((value) => {
                  var PLink = `https://codeforces.com/problemset/problem/${value[0]}/${value[1]}`;
                  console.log(PLink);
                  if (PLink === problem2.Link) {
                    f = 1;
                    table += `<tr><td class='border-1 border-black'>${i}</td><td class='border-1 border-black'><a href="${problem2.Link}" target="_blank" class='link link-primary'>${problem2.Name}</a></td><td class='border-1 border-black'>${problem2.Tags}</td><td class='border-1 border-black'>${problem2.Level}</td><td class='border-1 border-black'>${problem2.Knowledge}</td><td class='border-1 border-black'>${value[2]}</td></tr>`;
                    return;
                  }
                });
                // console.log("hello");
              }
              if (f === 0) {
                table += `<tr><td class='border-1 border-black'>${i}</td><td class='border-1 border-black'><a href="${problem2.Link}" target="_blank" class='link link-primary'>${problem2.Name}</a></td><td class='border-1 border-black'>${problem2.Tags}</td><td class='border-1 border-black'>${problem2.Level}</td><td class='border-1 border-black'>${problem2.Knowledge}</td><td class='border-1 border-black'>X</td></tr>`;
              }
              f = 0;
              i = i + 1;
            });
            setTables(table);
          });
      } catch (error) {
        err = 1;
      }
    };
    Get();
  }, [propsValue[0]]);

  return (
    <>
      <table
        className="table table-striped table-hover table-border"
        id="myTable"
      >
        <thead>
          <tr className="text-center">
            <td className="border-2 border-blue">No.</td>
            <td className="border-2 border-blue">Problem</td>
            <td className="border-2 border-blue">Tags</td>
            <td className="border-2 border-blue">Difficulty Level</td>
            <td className="border-2 border-blue">Required Knowledge</td>
            <td className="border-2 border-blue">Status</td>
          </tr>
        </thead>
        <tbody
          id="Lists"
          className="text-center"
          dangerouslySetInnerHTML={{ __html: tables }}
        ></tbody>
      </table>
    </>
  );
};

// import React, { useState, useEffect } from "react";
// import "./ProblemList.css";

// const ProblemList = ({ handle, rating }) => {
//   const [problems, setProblems] = useState([]);
//   const [status, setStatus] = useState({});

//   // Fetch problems from the backend
//   useEffect(() => {
//     fetch(`https://ladder-backend.onrender.com/all-${rating}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setProblems(data);
//       })
//       .catch((error) => console.error("Error fetching problems:", error));
//   }, [rating]);

//   // Fetch user's submission status from Codeforces API
//   useEffect(() => {
//     if (handle) {
//       fetch(`https://codeforces.com/api/user.status?handle=${handle}`)
//         .then((response) => response.json())
//         .then((data) => {
//           const solvedProblems = {};
//           data.result.forEach((submission) => {
//             const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
//             solvedProblems[problemId] = submission.verdict;
//           });
//           setStatus(solvedProblems);
//         })
//         .catch((error) => console.error("Error fetching user status:", error));
//     }
//   }, [handle]);

//   return (
//     <div className="problem-list">
//       <table>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Problem</th>
//             <th>Tags</th>
//             <th>Difficulty Level</th>
//             <th>Required Knowledge</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {problems.map((problem, index) => {
//             const problemId = `${problem.Link.split("/problem/")[1]}`;
//             const verdict = status[problemId] || "X";
//             return (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <a
//                     href={problem.Link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {problem.Name}
//                   </a>
//                 </td>
//                 <td>{problem.Tags}</td>
//                 <td>{problem.Level}</td>
//                 <td>{problem.Knowledge}</td>
//                 <td>{verdict}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProblemList;
