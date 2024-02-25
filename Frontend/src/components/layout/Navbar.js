// import profilImage from "../../../assets/images/profil image.webp";
import { useRouter } from "next/router";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import api from "@/api/api";

const Navbar = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id;
  const [status, setStatus] = useState("");

  const containAdminPath =
    router.asPath.split("/").includes("vacations-list") ||
    router.asPath.split("/").includes("employee-list");

  useEffect(() => {
    const getStatus = async () => {
      if (userId != undefined) {
        await api.get(`/status/${userId}`).then((result) => {
          setStatus(result.data);
          if (result.data !== "Admin" && containAdminPath) {
            router.push("/");
          }
        });
      }
    };

    getStatus();
  }, [userId]);

  return (
    <div
      className="
    sticky left-0 right-0 top-0 z-10 bg-white drop-shadow-md"
    >
      <div
        className="
        mx-auto flex max-w-7xl  px-4 py-2 flex-col justify-between content-center gap-5 lg:flex-row"
      >
        <div
          className="
          flex items-center justify-center space-x-5 "
        >
          <Link href="/" replace>
            <span className="cursor-pointer rounded p-1 font-poppins text-lg font-black uppercase border border-violet-900 bg-white hover:bg-violet-600 hover:text-white text-violet-900">
              Employee Vacation Manager
            </span>
          </Link>
        </div>
        <div
          className="
          flex items-center justify-center gap-x-2"
        >
          <span className="block cursor-pointer rounded p-2"></span>
          {userId && (
            <Link href={`/${userId}/request-vacation`}>
              <button
                className="
                rounded border border-violet-900 bg-white p-1 font-bold text-violet-900 outline-none hover:bg-violet-600 hover:text-white md:block"
              >
                Request a vacation
              </button>
            </Link>
          )}
          {userId && status === "Admin" ? (
            <>
              <Link href={`/${userId}/vacations-list`}>
                <button
                  className="
                  rounded border border-violet-900 bg-white p-1 font-bold text-violet-900 outline-none hover:bg-violet-600 hover:text-white md:block"
                >
                  Vacations List
                </button>
              </Link>
              <Link href={`/${userId}/employee-list`}>
                <button
                  className="
                  rounded border border-violet-900 bg-white p-1 font-bold text-violet-900 outline-none hover:bg-violet-600 hover:text-white md:block"
                >
                  Employees list
                </button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
