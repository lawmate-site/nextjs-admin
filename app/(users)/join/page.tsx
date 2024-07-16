"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IAdmin } from "@/components/_model/admin/admin";
import { adminSave } from "@/components/_service/admin/admin.service";

function Join() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({} as IAdmin);

  const handleJoin = async () => {
    try {
      console.log(formData);
      await dispatch(adminSave(formData))
        .then((res: any) => {
          alert("success to join us");
          console.log(res);
        })
        .then(() => {
          router.push("/login");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div
          id="login"
          className="font-roboto w-[37vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">회원가입</p>
          <div>
            <label
              htmlFor="username"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">아이디</p>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={(e: any) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="password"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">비밀번호</p>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이메일</p>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="name"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이름</p>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={(e: any) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="lawyerNo"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">역할</p>
              <select
                name="roles"
                id="role-select"
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                onChange={(e: any) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="">--Please choose an option--</option>
                <option value="super">Super</option>
                <option value="normal">Normal</option>
              </select>
            </label>
            <button
              onClick={() => handleJoin()}
              className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login/lawyer`)}
              className="text-gray-700 text-sm"
            >
              Already Joined?
            </p>
            <p
              onClick={() => router.push(`/login/user`)}
              className="text-gray-700 text-sm"
            >
              Are you a general user?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;
