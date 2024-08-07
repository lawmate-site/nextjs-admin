"use client";

import { IAdmin } from "@/components/_model/admin/admin";
import { ILawyer } from "@/components/_model/lawyer/lawyer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  enableAdminById,
  enabledAdmin,
  getAllAdmin,
} from "@/components/_service/admin/admin.service";
import Image from "next/image";

const ManagementAdminPage = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([{} as IAdmin]);

  const notificationsPerPage = 10;
  const [isChecked, setIsChecked] = useState(true);
  const [admin, setAdmin] = useState<IAdmin[]>([
    {
      id: 0,
      email: "",
      password: "",
      role: "",
      name: "",
      enabled: false,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const adminPerPage = 10;

  const handleCheck = async (id: any) => {
    console.log("id : ", id);
    setAdmin([(admin[0] = { ...admin[0], enabled: !admin[0].enabled })]);
    // setIsChecked(!isChecked); // Update checkbox state immediately
    try {
      // await dispatch(enableAdminById(id)).then(() => {
      //   window.location.reload();
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async (page: any) => {
    try {
      // await dispatch(getAllAdmin()).then((res: any) => {
      //   if (res) setNotifications(res.payload);
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    console.log("before : ", isChecked);
    try {
      setIsChecked(!isChecked);
      if (isChecked) {
        console.log("after : ", isChecked);
      } else {
        // getEnabledNotification(currentPage);
        console.log("after : ", isChecked);
      }
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

  useEffect(() => {
    getNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(admin.length / adminPerPage);
  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <h1 className="text-3xl">관리자 관리</h1>
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
              <p>enabled</p>
              <input
                type="checkbox"
                checked={!isChecked}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-10">
          <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
            <div className="w-16">NO.</div>
            <div className="w-32">이메일</div>
            <div className="w-32">이름</div>
            <div className="w-32">역할</div>
            <div className="w-32">enabled</div>
          </div>
          {admin.map((item, key) => (
            <div
              key={item.id}
              className="flex flex-col border-b border-black/30 group"
            >
              <div className="flex flex-row gap-2 px-2 py-1 text-center">
                <div className="w-16 px-1">
                  {(currentPage - 1) * adminPerPage + key + 1}
                </div>
                <div className="w-32 px-2 text-left truncate">{item.email}</div>
                <div className="w-32 px-1">{item.name}</div>
                <div className="w-32 px-1">{item.role}</div>
                <div className="w-32 px-1 flex items-center justify-center">
                  <div className="w-16 px-1">
                    <input
                      type="checkbox"
                      defaultChecked={item.enabled}
                      onChange={(e: any) => handleCheck(item.id)}
                    />
                  </div>
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

export default ManagementAdminPage;
