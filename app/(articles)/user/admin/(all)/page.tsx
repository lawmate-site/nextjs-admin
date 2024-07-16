"use client";

import { IAdmin } from "@/components/_model/admin/admin";
import {
  enableAdminById,
  enabledAdmin,
  getAllAdmin,
} from "@/components/_service/admin/admin.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminBoardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([{} as IAdmin]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10;
  const [isChecked, setIsChecked] = useState(false);

  const getNotifications = async (page: any) => {
    try {
      await dispatch(getAllAdmin()).then((res: any) => {
        if (res) setNotifications(res.payload);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEnabledNotification = async (page: any) => {
    try {
      await dispatch(enabledAdmin()).then((res: any) => {
        if (res) setNotifications(res.payload);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (id: any) => {
    setIsChecked(!isChecked); // Update checkbox state immediately
    try {
      await dispatch(enableAdminById(id)).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      getNotifications(currentPage);
    };
  }, [currentPage, isChecked]);

  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-[32px]">User Admins</h1>
        <div className="flex flex-row pt-10 items-center">
          <div className="w-96 h-7 border border-black flex flex-row justify-between ml-40">
            <input className="w-80 focus:outline-none" />
            <Image
              width={25}
              height={25}
              src={
                "https://img.icons8.com/?size=100&id=e4NkZ7kWAD7f&format=png&color=000000"
              }
              style={{ width: 25, height: 25 }}
              alt={"find"}
            />
          </div>
          <div>
            <div className="w-20 ml-20 flex flex-row gap-5">
              {/* <p>enabled</p>
              <input
                type="checkbox"
                checked={isChecked}
                onClick={(e) => setIsChecked(!isChecked)}
              /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
            <div className="w-16">NO.</div>
            <div className="w-36">아이디</div>
            <div className="w-36">이름</div>
            <div className="w-36">비밀번호</div>
            <div className="w-36">이메일</div>
            <div className="w-36">역할</div>
            <div className="w-16">Enabled</div>
            <div className="w-24">개인 페이지</div>
          </div>
          {notifications.map((item: any, key) => (
            <div
              key={key}
              className="flex flex-col border-b border-black/30 group"
            >
              <div className="flex flex-row gap-2 px-2 py-1 text-center items-center">
                <div className="w-16 px-1">
                  {(currentPage - 1) * notificationsPerPage + key + 1}
                </div>
                <div className="w-36 px-2">{item.username}</div>
                <div className="w-36 px-1">{item.name}</div>
                <div className="w-36 px-1">{item.password}</div>
                <div className="w-36 px-1">{item.email}</div>
                <div className="w-36 px-1">{item.role}</div>
                {item.enabled !== undefined && (
                  <div className="w-16 px-1">
                    <input
                      type="checkbox"
                      defaultChecked={item.enabled}
                      onChange={(e) => handleCheck(item.id)}
                    />
                  </div>
                )}
                <div className="flex justify-center items-center w-24">
                  <Image
                    width={20}
                    height={20}
                    src={
                      "https://img.icons8.com/?size=100&id=rM2nN8owozla&format=png&color=000000"
                    }
                    alt={"to single page"}
                    style={{ width: 20, height: 20 }}
                    onClick={() => router.push(`/user/admin/${item.id}`)}
                  />
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
              key={i}
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

export default AdminBoardPage;
