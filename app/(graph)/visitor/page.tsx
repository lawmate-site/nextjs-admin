"use client";

import {
  getLast7Days,
  getMonthlyVisits,
  getVisitorCountToday,
  getYearVisits,
} from "@/components/_service/admin/admin.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Chart } from "react-google-charts";

const VisitorWeekly = () => {
  const dispatch = useDispatch();
  const [visitors, setVisitors] = useState({
    year: "2024",
    month: "07",
    day: "01",
  });
  const [month, setMonth] = useState(0);
  const [visitorsData, setVisitorsData] = useState({});
  const [last7Days, setLast7Days] = useState({});
  const options = {
    title: "Chart Title",
    colors: ["gray"],
  };
  const [visitorCountToday, setVisitorCountToday] = useState(0);

  useEffect(() => {
    return () => {
      try {
        dispatch(getMonthlyVisits(visitors)).then((res: any) => {
          setMonth(res.payload);
        });

        dispatch(getYearVisits(visitors)).then((res: any) => {
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
          setVisitorsData(transformedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, [visitors]);

  useEffect(() => {
    return () => {
      try {
        dispatch(getVisitorCountToday()).then((res: any) => {
          setVisitorCountToday(res.payload);
        });
        dispatch(getLast7Days()).then((res: any) => {
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
          setLast7Days(transformedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-[32px]">이번 달 방문자: {month}</h1>
        <h1 className="text-[32px] w-200">월간 방문자</h1>
        <Chart chartType="LineChart" data={visitorsData} options={options} />
        <h1 className="text-[32px]">7일간</h1>
        <Chart chartType="LineChart" data={last7Days} options={options} />
        <h1 className="text-[32px]">오늘 방문자: {visitorCountToday}</h1>
      </div>
    </>
  );
};

export default VisitorWeekly;
