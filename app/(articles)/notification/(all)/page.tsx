"use client";

import { findAll } from "@/components/_service/admin/admin.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const NotificationBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title:
        "공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1공지사항1",
      content: "공지사항1 내용",
      date: "2022-01-01",
      writer: "관리자1관리자1관리자1관리자1",
      viewCount: 10,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;

  const getNotifications = async (page: any) => {
    try {
      const response = await dispatch(findAll(page, notificationsPerPage));
      console.log(response);
      if (response) setNotifications(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("notification board page");
    getNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-[32px]">공지사항</h1>
        <div className="flex flex-row pt-10 items-baseline">
          <div className="w-96 h-7 border border-black flex flex-row justify-between ml-40">
            <input className="w-80 focus:outline-none" />
            <Image
              width={30}
              height={20}
              src={
                "https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
              }
              alt={"find"}
            />
          </div>
          <div
            className="w-20 ml-20"
            onClick={() => {
              router.push("/notification/add");
            }}
          >
            글쓰기
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
            <div className="w-16">NO.</div>
            <div className="w-96">제목</div>
            <div className="w-32">작성자</div>
            <div className="w-24">날짜</div>
            <div className="w-16">조회수</div>
          </div>
          {notifications.map((item, key) => (
            <div
              key={item.id}
              className="flex flex-col border-b border-black/30 group"
              onClick={() => {
                router.push(`/notification/${item.id}`);
              }}
            >
              <div className="flex flex-row gap-2 px-2 py-1 text-center">
                <div className="w-16 px-1">
                  {(currentPage - 1) * notificationsPerPage + key + 1}
                </div>
                <div className="w-96 px-2 text-left truncate">{item.title}</div>
                <div className="w-32 px-1 truncate">{item.writer}</div>
                <div className="w-24 px-1">{item.date}</div>
                <div className="w-16 px-1">{item.viewCount}</div>
              </div>
              <div className="px-20 py-10 border-y border-black/30 group-hover:block hidden">
                {item.content}
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

export default NotificationBoardPage;
