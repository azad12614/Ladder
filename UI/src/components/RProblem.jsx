import React from 'react';
import { useState, useEffect } from 'react';

export default ({ propsValue }) => {
    var err = 1, f = 0, i = 0, table = ``, user = [];

    const Api = `https://codeforces.com/api/user.status?handle=${propsValue[0]}`;

    const [tables, setTables] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        err = 1;

        const Get = async () => {
            try {
                await fetch(Api).then((data) => {
                    if (data.status == 200) {
                        err = 0;
                    }
                    return data.json();
                }).then((list) => {
                    user = list.result;
                    setUsers(user);
                })
            } catch (error) {
                err = 1;
            }

            try {
                await fetch(`http://localhost:3000/all-${propsValue[1]}`)
                    .then((data) => {
                        return data.json();
                    }).then((list2) => {
                        list2.map((problem2) => {
                            if (err != 1) {
                                (users || []).map((problem1) => {
                                    console.log(problem1);
                                    var problem3 = problem1.problem;
                                    console.log(problem3);
                                    var PLink = `https://codeforces.com/problemset/problem/${problem3.contestId}/${problem3.index}`;
                                    if (PLink == problem2.Link) {
                                        f = 1;
                                        table += `<tr><td className='border-1 border-black'>${i}</td><td class='border-1 border-black'><a href="https://codeforces.com/problemset/problem/${problem3.contestId}/${problem3.index}" target="_blank" class='link link-primary'>${problem3.name}</a></td><td class='border-1 border-black'>${problem3.tags}</td><td class='border-1 border-black'>${problem2.Level}</td><td class='border-1 border-black'>${problem2.Knowledge}</td><td class='border-1 border-black'>${problem1.verdict}</td></tr>`;
                                        return;
                                    }
                                })
                            }
                            if (f == 0) {
                                table += `<tr><td class='border-1 border-black'>${i}</td><td class='border-1 border-black'><a href="${problem2.Link}" target="_blank" class='link link-primary'>${problem2.Name}</a></td><td class='border-1 border-black'>${problem2.Tags}</td><td class='border-1 border-black'>${problem2.Level}</td><td class='border-1 border-black'>${problem2.Knowledge}</td><td class='border-1 border-black'>X</td></tr>`;
                            }
                            f = 0;
                            i = i + 1;
                        })
                        setTables(table);
                    });
            } catch (error) {
                err = 1;
            }
        }
        Get();
    }, [propsValue[0]]);

    return (
        <>
            <table className="table table-striped table-hover table-border" id="myTable">
                <thead>
                    <tr className="text-center">
                        <td className='border-2 border-blue'>No.</td>
                        <td className='border-2 border-blue'>Problem</td>
                        <td className='border-2 border-blue'>Tags</td>
                        <td className='border-2 border-blue'>Difficulty Level</td>
                        <td className='border-2 border-blue'>Required Knowledge</td>
                        <td className='border-2 border-blue'>Status</td>
                    </tr>
                </thead>
                <tbody id="Lists" className="text-center" dangerouslySetInnerHTML={{ __html: tables }}></tbody>
            </table>
        </>
    )
};