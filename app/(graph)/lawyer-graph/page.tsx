"use client";

import { ILawyer } from "@/components/_model/lawyer/lawyer";
import {
  getLawyerAuthFalseStats,
  getLawyerStatsAll,
  getLawyerTotalStats,
} from "@/components/_service/admin/admin.service";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useDispatch } from "react-redux";

interface ChartOptions {
  allowHtml: boolean;
  showRowNumber: boolean;
  // Add other options you might use
}

const options: ChartOptions = {
  allowHtml: true,
  showRowNumber: true,
};

const LawyerGraph = (props: any) => {
  const dispatch = useDispatch();
  const [totalLawyer, setTotalLawyer] = useState({
    total: 0,
    authFalse: 0,
    authTrue: 0,
  });

  const [authFalseLawyerList, setAuthFalseLawyerList] = useState([]);
  const [lawyerStats, setLawyerStats] = useState({});

  useEffect(() => {
    return () => {
      try {
        dispatch(getLawyerTotalStats()).then((res: any) => {
          setTotalLawyer({
            total: res.payload?.totalLawyers,
            authFalse: res.payload?.totalLawyersAuthFalse,
            authTrue: res.payload?.totalLawyersAuthTrue,
          });
        });

        dispatch(getLawyerAuthFalseStats()).then((res: any) => {
          const chartData = res.payload.map((lawyer: ILawyer) => [
            lawyer.name,
            lawyer.email,
          ]);

          chartData.unshift(["이름", "이메일"]);

          setAuthFalseLawyerList(chartData);
        });

        dispatch(getLawyerStatsAll()).then((res: any) => {
          const transformedData = res.payload.map((data: any) => [
            data.date,
            parseInt(data.increaseRate),
            parseInt(data.newLawyerCount),
            parseInt(data.totalLawyersAuthFalse),
          ]);

          transformedData.unshift([
            "Date",
            "IncreaseRate",
            "NewLawyerCount",
            "TotalLawyersAuthFalse",
          ]); // Add header

          setLawyerStats(transformedData);
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
          <p>변호사 통계</p>
          <div className="flex flex-col items-end gap-1">
            <h1 className="text-xs">총 변호사 수: {totalLawyer.total || 0}</h1>
            <h1 className="text-xs">
              승인된 변호사 수: {totalLawyer.authTrue || 0}
            </h1>
            <h1 className="text-xs">
              승인이 안된 변호사 수: {totalLawyer.authFalse || 0}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 p-3">
          <div className="flex flex-col p-5 border gap-3">
            <h1 className=" text-lg">인증 실패 변호사 목록</h1>
            <Chart
              chartType="Table"
              data={authFalseLawyerList}
              options={{
                ...options,
                title: "인증 실패 변호사 목록",
              }}
            />
          </div>
          <div className="flex flex-col w-9/12 p-5 border gap-3">
            <Chart
              chartType="LineChart"
              data={lawyerStats}
              options={{ title: "변호사 전체 통계" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerGraph;
