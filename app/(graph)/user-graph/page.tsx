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

  const [year, setYear] = useState({});
  const [month, setMonth] = useState({});
  const [day, setDay] = useState({});

  const monthOptions = {
    title: "월별 신규 유저 수",
    hAxis: {
      title: "월",
    },
    vAxis: {
      title: "신규 유저 수",
    },
  };

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
          transformedData.sort(
            (a, b) => parseInt(a[0].toString()) - parseInt(b[0].toString())
          );

          transformedData.unshift(["Age", "Users"]); // Add header
          setUserData(transformedData);
        });

        dispatch(getUserMonthStates()).then((res: any) => {
          console.log(res);
          const monthChartData = [
            ["월", "증가율", "유저 수"],
            ...res.payload?.map((data: any) => [
              data.month,
              data.increaseRate,
              data.newUserCount,
            ]),
          ];
          setMonth(monthChartData);
        });

        dispatch(getUserDateStats()).then((res: any) => {
          console.log(res);
          const transformedData = Object.entries(res.payload).map(
            ([date, increaseRate, newUserCount]: any) => [
              date,
              parseInt(increaseRate), // Ensure visits is a number
              parseInt(newUserCount), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort(
            (a, b) => parseInt(a[0].toString()) - parseInt(b[0].toString())
          );

          transformedData.unshift(["Date", "increaseRate", "newUserCount"]); // Add header
          setDay(transformedData);
        });

        dispatch(getUserYearStats()).then((res: any) => {
          console.log(res);
          const transformedData = Object.entries(res.payload).map(
            ([year, increaseRateAverage, newUserCount]: any) => [
              year,
              parseInt(increaseRateAverage), // Ensure visits is a number
              parseInt(newUserCount), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift([
            "Year",
            "increaseRateAverage",
            "newUserCount",
          ]); // Add header
          setYear(transformedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, [dispatch]);

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
            <Chart chartType="LineChart" data={day} />
            <Chart chartType="LineChart" data={month} options={monthOptions} />
            <Chart chartType="LineChart" data={year} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGraph;
