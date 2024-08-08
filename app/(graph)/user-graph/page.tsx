"use client";

import {
  getUserDateStats,
  getUserMonthStates,
  getUserTotalStats,
  getUserYearStats,
} from "@/components/_service/admin/admin.service";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";

const UserGraph = (props: any) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const options = {
    title: "Chart Title",
    colors: ["gray"],
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    return () => {
      try {
        dispatch(getUserTotalStats()).then((res: any) => {
          const transformedData = Object.entries(res.payload).map(
            ([age, users]: any) => [
              age,
              parseInt(users), // Ensure visits is a number
            ]
          );

          // Sort the data by age in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Age", "Users"]); // Add header
          setUserData(transformedData);
        });

        dispatch(getUserMonthStates()).then((res: any) => {
          console.log(res);
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
        });

        dispatch(getUserDateStats()).then((res: any) => {
          console.log(res);
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
        });

        dispatch(getUserYearStats()).then((res: any) => {
          console.log(res);
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <>
      <div className="w-[1200px] border p-2">
        <div className="border-b p-2 flex flex-row justify-between items-start">
          <p>유저 통계</p>
          <div className="flex flex-col items-end gap-1">
            <h1 className="text-xs">이번 연도: 0</h1>
            <h1 className="text-xs">이번 달: 0</h1>
            <h1 className="text-xs">오늘: 0</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-3">
          <div className="flex flex-col w-full p-5 border gap-3">
            <h1 className=" text-lg">총 사용자 통계</h1>
            <Chart chartType="LineChart" data={userData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGraph;
