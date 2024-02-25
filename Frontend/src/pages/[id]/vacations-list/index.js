import api from "@/api/api";
import React, { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import { FcFullTrash } from "react-icons/fc";
import moment from "moment";

const index = () => {
  const [vacations, setVacations] = useState([]);
  const [approveVacationResult, setApproveVacationResult] = useState("");

  useEffect(() => {
    if (approveVacationResult) {
      setTimeout(() => {
        setApproveVacationResult("");
      }, 3000);
    }
  });

  useEffect(() => {
    const getALLVacations = () => {
      api.get("/vacations").then((result) => {
        setVacations(result.data);
      });
    };

    getALLVacations();
  }, []);

  const approveVacation = async (vacationId, userId) => {
    await api
      .put("/vacations", { vacationId, userId })
      .then((result) => {
        setApproveVacationResult(result.data.message);
      })
      .then(async (result) => {
        return await api.get("/vacations").then((result) => {
          setVacations(result.data);
        });
      });
  };

  const deleteVacation = async (vacationId, userId) => {
    await api
      .delete(`/vacations/${userId}/${vacationId}`)
      .then((result) => {
        setApproveVacationResult(result.data.message);
      })
      .then(async (result) => {
        return await api.get("/vacations").then((result) => {
          setVacations(result.data);
        });
      });
  };

  return (
    <>
      <div className="font-bold text-4xl text-center text-violet-900 uppercase">
        Vacations-list
      </div>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 mt-14">
        <thead className="text-xs text-gray-700 uppercase bg-violet-900 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-white">
              Start date
            </th>
            <th scope="col" className="py-3 px-6 text-white">
              End date
            </th>
            <th scope="col" className="py-3 px-6 text-white text-center">
              Status
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-white flex justify-center content-center"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {vacations.map((vacation) => {
            return (
              <tr
                className="bg-white border-b text-violet-900"
                key={vacation._id}
              >
                <td className="py-4 px-6">
                  {moment(vacation.startDate).format("DD-MM-yyyy")}
                </td>
                <td className="py-4 px-6">
                  {moment(vacation.endDate).format("DD-MM-yyyy")}
                </td>
                <td className="py-4 px-6 text-center">{vacation.status}</td>
                <td className="py-4 px-6 flex justify-center content-center gap-4">
                  <FcOk
                    title="approve"
                    className="cursor-pointer"
                    size={"24"}
                    onClick={() => {
                      approveVacation(vacation._id, vacation.userId);
                    }}
                  />
                  <FcFullTrash
                    title="refuse"
                    className="cursor-pointer"
                    size={"25"}
                    onClick={() => {
                      deleteVacation(vacation._id, vacation.userId);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex mt-8">
        {approveVacationResult && (
          <div className="animate-[bounce_0.5s_ease-in-out] text-white hidden rounded border p-1 font-bold outline-none md:block bg-green-500 fixed bottom-5">
            {approveVacationResult}
          </div>
        )}
      </div>
    </>
  );
};

export default index;
