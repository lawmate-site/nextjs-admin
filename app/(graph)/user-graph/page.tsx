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

  const [user, setUser] = useState({
    total: "",
    female: "",
    male: "",
  });

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
          const { total, female, male, ...rest } = res.payload; // 나머지 데이터를 rest에 저장

          // 나머지 데이터를 나이대 순으로 정렬
          const sortedData = Object.entries(rest)
            .map(([age, users]: any) => [age, parseInt(users)])
            .sort((a, b) => {
              const ageA = a[0].replace(/\D/g, ""); // 숫자만 추출
              const ageB = b[0].replace(/\D/g, "");
              if (a[0].startsWith("20대 미만")) return -1; // 20대 미만은 항상 앞으로
              if (b[0].startsWith("20대 미만")) return 1;
              return parseInt(ageA) - parseInt(ageB);
            });
          // 데이터에 헤더 추가
          sortedData.unshift(["Age", "Users"]);

          // user, setUser 상태 업데이트
          setUser({ total, female, male });
          setUserData(sortedData);
        });

        dispatch(getUserMonthStates()).then((res: any) => {
          const transformedData = res.payload.map((data: any) => [
            parseInt(data.month),
            parseInt(data.increaseRateAverage),
            parseInt(data.newUserCount),
          ]);

          transformedData.unshift([
            "Month",
            "increaseRateAverage",
            "newUserCount",
          ]); // Add header
          setMonth(transformedData);
        });

        dispatch(getUserDateStats()).then((res: any) => {
          const transformedData = res.payload.map((data: any) => [
            data.date,
            parseInt(data.increaseRate),
            parseInt(data.newUserCount),
          ]);

          transformedData.unshift(["Date", "increaseRate", "newUserCount"]); // Add header
          setDay(transformedData);
        });

        dispatch(getUserYearStats()).then((res: any) => {
          const transformedData = res.payload.map((data: any) => [
            parseInt(data.year),
            parseInt(data.increaseRateAverage),
            parseInt(data.newUserCount),
          ]);

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
            <h1 className="text-xs">통합: {user.total || 0}</h1>
            <h1 className="text-xs">여자: {user.female || 0}</h1>
            <h1 className="text-xs">남자: {user.male || 0}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-3">
          <div className="flex flex-col w-full p-5 border gap-3">
            <Chart
              chartType="LineChart"
              data={userData}
              options={{ ...options, title: "총 사용자 통계" }}
            />
          </div>
          <div className="flex flex-col w-full p-5 border gap-3">
            <Chart
              chartType="LineChart"
              data={day}
              options={{
                title: "일 별 통계",
                hAxis: { format: "0" },
              }}
            />
          </div>
          <div className="flex flex-col w-full p-5 border gap-3">
            <Chart
              chartType="LineChart"
              data={month}
              options={{
                title: "월 별 통계",
                hAxis: { format: "0" },
              }}
            />
          </div>
          <div className="flex flex-col w-full p-5 border gap-3">
            <Chart
              chartType="LineChart"
              data={year}
              options={{
                title: "연도 별 통계",
                hAxis: { format: "0" },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGraph;
