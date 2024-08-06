"use client";

import LawyerGraph from "@/app/(graph)/lawyer-graph/page";
import UserGraph from "@/app/(graph)/user-graph/page";
import VisitorWeekly from "@/app/(graph)/visitor/page";
import { useDispatch } from "react-redux";

const AfterLoginedPage = (props: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center relative w-full pt-10`}
      >
        <div className="flex flex-col p-10 w-[1400px]">
          <div className="p-5 border-b mb-5">
            <h1 className="text-2xl font-semibold sticky top-0">DashBoard</h1>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-5 p-5">
            <VisitorWeekly />
            <LawyerGraph />
            <UserGraph />
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterLoginedPage;
