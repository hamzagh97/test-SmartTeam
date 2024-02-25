import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import api from "@/api/api";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getEmployees = () => {
      api.get(`/employees`).then((result) => {
        setUsers(result.data);
      });
    };
    getEmployees();
  }, []);

  return (
    <div
      className="
        w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-10 text-center rounded-xl"
    >
      <p className="text-lg font-bold text-white">
        Welcome to Employee Vacation Manager 👋
      </p>
      <blockquote className="mt-5">
        <p className="text-lg font-bold text-white">
          "He that can take rest is greater than he that can take cities."
        </p>
        <p className="mt-5 font-bold italic text-white">- Benjamin Franklin</p>
      </blockquote>

      <div className="mt-20 text-lg font-bold text-white">
        Choose employee to log in with:
      </div>
      <div className="text-center w-full flex justify-center content-center flex-col">
        {users.map((user) => {
          return (
            <Link
              href={`/${user.userId}`}
              key={user._id}
              className="flex justify-center content-center"
            >
              <span className="mt-5 flex space-x-5">
                <button
                  className="
                  rounded border border-violet-300 bg-transparent px-3 py-1.5 font-bold capitalize text-white outline-none hover:border-violet-900 hover:bg-violet-900 hover:text-white"
                >
                  {user.name} === {user.status}
                </button>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
