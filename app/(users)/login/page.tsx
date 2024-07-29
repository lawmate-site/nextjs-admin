"use client";

import { getAccessToken } from "@/components/modules/cookies";
import { get } from "http";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {

      const response = await fetch('http://localhost:8000/auth/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
    });

    if (response.ok) {
      //  console.log(response.headers.get('Authorization'));
        alert('Registration successful!');
        router.push('/');
    } else {
        alert('Registration failed!');
      // await dispatch(loginId(formData))
      //   .then((res: any) => {
      //     alert("success to login");
      //     console.log(res.payload.userId);
      //   })
      //   .then(() => {
      //     router.push("/");
      //   })
      //   .catch((error: any) => {
      //     console.log(error);
      //   });
 
  };
}

  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div
          id="login"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">로그인</p>
          <div>
            <label htmlFor="email">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Username"
                value={formData.email}
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              onClick={() => handleLogin()}
              className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/find-username`)}
              className="text-gray-700 text-sm"
            >
              Forgot your username?
            </p>
            <p
              onClick={() => router.push(`/find-password`)}
              className="text-gray-700 text-sm"
            >
              Forgot your password?
            </p>
            <p
              onClick={() => router.push(`/join`)}
              className="text-gray-700 text-sm"
            >
              Aren&apos;t you a member yet? Join now!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;