import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { useParams } from "next/navigation";
import moment from "moment";
import api from "@/api/api";

export default function Home() {
  const params = useParams();
  const id = params?.id;
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    const getVacations = () => {
      api.get(`/${id}/vacations`).then((result) => {
        setVacations(result.data);
      });
    };

    if (id != undefined) {
      getVacations();
    }
  }, [id]);

  return (
    <>
      <div className="font-bold text-4xl text-center text-violet-900 uppercase">
        my vacations
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
            <th scope="col" className="py-3 px-6 text-white">
              Status
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
                <td className="py-4 px-6">{vacation.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
