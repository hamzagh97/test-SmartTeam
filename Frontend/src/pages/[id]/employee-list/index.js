import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import api from "@/api/api";

const index = () => {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchEmployees = () => {
      api.get("/employees").then((result) => {
        setEmployees(result.data);
      });
    };
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="font-bold text-4xl text-center text-violet-900 uppercase">
        Employees-list
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-14">
        <thead className="text-xs text-gray-700 uppercase bg-violet-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-white">
              Name
            </th>
            <th scope="col" className="py-3 px-6 text-white">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr
                className="bg-white border-b text-violet-900 cursor-pointer hover:bg-violet-300"
                key={employee._id}
                onClick={() => {
                  router.push(`/${params.id}/employee-list/${employee.userId}`);
                }}
              >
                <td className="py-4 px-6">{employee.name}</td>
                <td className="py-4 px-6">{employee.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default index;
