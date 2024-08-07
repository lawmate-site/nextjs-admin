"use client";

import { findAll } from "@/components/_service/admin/admin.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InquiryBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title:
        "건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1",
      content: "건의사항1 내용",
      date: "2022-01-01",
      writer: "사용자1사용자1사용자1사용자1사용자1사용자1사용자1사용자1",
      answer: "답변1답변1답변1답변1답변1답변1답변1답변1답변1",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  const getNotifications = async (page: any) => {
    // try {
    //   const response = await dispatch(findAll(page, notificationsPerPage));
    //   console.log(response);
    //   if (response) setNotifications(response.payload);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    console.log("notification board page");
    getNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <h1 className="text-3xl">건의사항 관리</h1>
        <div className="flex flex-col pt-10">
          <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
            <div className="w-16">NO.</div>
            <div className="w-96">제목</div>
            <div className="w-32">작성자</div>
            <div className="w-32">날짜</div>
            <div className="w-24">답변 여부</div>
          </div>
          {notifications.map((item, key) => (
            <div
              key={item.id}
              className="flex flex-col border-b border-black/30 group"
              onClick={() => {
                router.push(`/inquiry/${item.id}`);
              }}
            >
              <div className="flex flex-row gap-2 px-2 py-1 text-center">
                <div className="w-16 px-1">
                  {(currentPage - 1) * notificationsPerPage + key + 1}
                </div>
                <div className="w-96 px-2 text-left truncate">{item.title}</div>
                <div className="w-32 px-1 truncate">{item.writer}</div>
                <div className="w-32 px-1">{item.date}</div>
                <div className="w-24 px-1">
                  {item.answer.length > 0 ? "true" : "false"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center pt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 border border-gray-300 rounded"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 border ${
                currentPage === i + 1 ? "border-black" : "border-gray-300"
              } rounded`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 border border-gray-300 rounded"
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default InquiryBoardPage;
