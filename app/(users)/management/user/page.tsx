"use client";

import { IUser } from "@/components/_model/user/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ManagementUserPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [user, setUser] = useState<IUser[]>([
    {
      id: 0,
      email: "1234@naver.com",
      name: "lwamae",
      password: "123456779",
      phone: "010-2345-6789",
      profile:
        "https://img.icons8.com/?size=100&id=9433&format=png&color=000000",
      role: JSON.parse("{}"),
      age: "24",
      gender: "여성",
      regDate: "2022-01-01",
      modDate: "2022-01-01",
      point: "100",
      roles: JSON.parse("{}"),
      registration: "2022-01-01",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const lawyerPerPage = 10;

  const getNotifications = async (page: any) => {
    // try {
    //   const response = await dispatch(findAll(page, lawyerPerPage));
    //   console.log(response);
    //   if (response) setNotifications(response.payload);
    // } catch (error) {
    //   console.log(error);
    // }
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

  useEffect(() => {
    console.log("notification board page");
    getNotifications(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(user.length / lawyerPerPage);
  return (
    <>
      <div className="flex flex-col items-center pt-32">
        <h1 className="text-3xl">사용자 관리</h1>
        <div className="flex flex-row items-center justify-between w-full mt-10">
          <div className="w-40 flex flex-row items-center gap-5"></div>
          <div className="w-7/12 h-7 border border-black flex flex-row justify-between">
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
          <div className="w-40 flex flex-row items-center gap-5"></div>
        </div>
        <div className="flex flex-col pt-10">
          <div className="flex flex-row gap-2 items-baseline border-b-2 border-black px-2 py-1 text-center">
            <div className="w-16">NO.</div>
            <div className="w-32">이메일</div>
            <div className="w-32">이름</div>
            <div className="w-32">전화번호</div>
            <div className="w-24">role</div>
            <div className="w-32">age</div>
            <div className="w-24">gender</div>
            <div className="w-24">regDate</div>
            <div className="w-32">modDate</div>
            <div className="w-32">point</div>
            <div className="w-32">roles</div>
            <div className="w-32">registration</div>
          </div>
          {user.map((item: any, key: any) => (
            <div
              key={item.id}
              className="flex flex-col border-b border-black/30 group"
              onClick={() => {
                router.push(`/inquiry/${item.id}`);
              }}
            >
              <div className="flex flex-row gap-2 px-2 py-1 text-center">
                <div className="w-16 px-1">
                  {(currentPage - 1) * lawyerPerPage + key + 1}
                </div>
                <div className="w-32 px-2 text-left truncate">{item.email}</div>
                <div className="w-32 px-1">{item.name}</div>
                <div className="w-32 px-1">{item.phone}</div>
                <div className="w-24 px-1">{item.role[0]}</div>
                <div className="w-32 px-1">{item.age}</div>
                <div className="w-24 px-1">{item.gender}</div>
                <div className="w-24 px-1">{item.regDate}</div>
                <div className="w-32 px-1">{item.modDate}</div>
                <div className="w-32 px-1">{item.point}</div>
                <div className="w-32 px-1">{item.roles[0]}</div>
                <div className="w-32 px-1">{item.registration}</div>
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

export default ManagementUserPage;
