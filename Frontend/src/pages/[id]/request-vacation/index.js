import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";
import api from "@/api/api";

const index = () => {
  const [startDate, setStartdate] = useState(moment().format("yyyy-MM-DD"));
  const [endDate, setEnddate] = useState(moment().format("yyyy-MM-DD"));
  const [comment, setComment] = useState("");
  const [addRequestResult, setAddRequestResult] = useState("");
  const params = useParams();
  const userId = params?.id;

  useEffect(() => {
    if (startDate > endDate) {
      setEnddate(startDate);
    }
    if (endDate < endDate) {
      setEnddate(startDate);
    }
    if (moment().format("yyyy-MM-DD") > startDate) {
      setStartdate(moment().format("yyyy-MM-DD"));
    }

    if (moment().format("yyyy-MM-DD") > endDate) {
      setEnddate(moment().format("yyyy-MM-DD"));
    }

    if (addRequestResult) {
      setTimeout(() => {
        setAddRequestResult("");
      }, 3000);
    }
  });

  const addVacationRequest = (e) => {
    e.preventDefault();
    api
      .post("/vacations", {
        startDate,
        endDate,
        status: "Pending",
        comment,
        userId,
      })
      .then((result) => {
        setAddRequestResult(result.data.message);
      });
  };

  return (
    <>
      <div className="font-bold text-4xl text-center text-violet-900 uppercase">
        Request-vacation
      </div>
      <form className="max-w-4xl mx-auto mt-14" onSubmit={addVacationRequest}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="startDate"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-violet-900 bg-transparent border-0 border-b-2 border-violet-600 appearance-none dark:text-black dark:border-violet-900 dark:focus:border-violet-600 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
              placeholder=" "
              value={startDate}
              required
              onChange={(e) => {
                setStartdate(moment(e.target.value).format("yyyy-MM-DD"));
              }}
            />
            <label
              htmlFor="startDate"
              className="peer-focus:font-medium absolute text-sm text-violet-600 dark:text-violet-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-900 peer-focus:dark:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start date
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="endDate"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-violet-900 bg-transparent border-0 border-b-2 border-violet-600 appearance-none dark:text-black dark:border-violet-900 dark:focus:border-violet-600 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
              placeholder=" "
              value={endDate}
              required
              onChange={(e) => {
                setEnddate(moment(e.target.value).format("yyyy-MM-DD"));
              }}
            />
            <label
              htmlFor="endDate"
              className="peer-focus:font-medium absolute text-sm text-violet-600 dark:text-violet-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-900 peer-focus:dark:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End date
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-violet-900 bg-transparent border-0 border-b-2 border-violet-600 appearance-none dark:text-violet-900 dark:border-violet-900 dark:focus:border-violet-600 focus:outline-none focus:ring-0 focus:border-violet-600 peer"
            placeholder=" "
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-violet-600 dark:text-violet-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-900 peer-focus:dark:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Comment
          </label>
        </div>
        <div className="flex mt-8">
          <button
            type="submit"
            className="
           hidden rounded border border-violet-900 bg-transparent p-1 font-bold text-violet-900 outline-none hover:bg-violet-600 hover:text-white md:block"
          >
            Submit
          </button>
        </div>
        <div className="flex mt-8">
          {addRequestResult && (
            <div className="animate-[bounce_1s_ease-in-out] text-white hidden rounded border p-1 font-bold outline-none md:block bg-green-500">
              {addRequestResult}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default index;
