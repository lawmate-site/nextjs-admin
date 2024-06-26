"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "animate.css";
import { useDispatch } from "react-redux";
import { joinId } from "@/redux/user/service/user.service";

export default function Home(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenLawLaw, setIsOpenLawLaw] = useState(false);

  useEffect(() => {
    dispatch(
      joinId({
        username: "test",
        password: "1234",
        role: "tester",
      })
    ).then((res: any) => {
      console.log("res", res);
    });
  }, []);

  useEffect(() => {
    if (isOpenLawLaw) {
      console.log("isOpenLawLaw", isOpenLawLaw);
    } else {
      console.log("isOpenLawLaw", isOpenLawLaw);
    }
  }, [isOpenLawLaw]);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center h-screen relative`}
      >
        <div className="flex flex-col p-0 justify-center items-center">
          <img src="/images/LAWMATE.jpg" className="w-[40vw]" alt="logo" />
          <div className=" justify-start flex flex-col gap-[0.5vh]">
            <div className="bg-[var(--color-Harbor-firth)] w-[41.53vw] hover:bg-gradient-to-r from-[var(--color-Harbor-first)] to-[var(--color-Harbor-firth)] transition duration-500 ease-in-out px-[2vw]">
              <button
                onClick={() => router.push(`/join`)}
                className="text-[var(--color-Harbor-second)] hover:text-[var(--color-Harbor-firth)] transition duration-500 ease-in-out"
              >
                회원가입 -&gt;
              </button>
            </div>
            <div className="bg-[var(--color-Harbor-firth)] w-[41.53vw] hover:bg-gradient-to-r from-[var(--color-Harbor-first)] to-[var(--color-Harbor-firth)] transition duration-500 ease-in-out px-[2vw]">
              <button
                onClick={() => router.push(`/login`)}
                className="text-[var(--color-Harbor-second)] hover:text-[var(--color-Harbor-firth)] transition duration-500 ease-in-out"
              >
                로그인 -&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
