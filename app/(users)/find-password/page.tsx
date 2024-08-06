"use client";

import { IAdmin } from "@/components/_model/admin/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IAdmin>();

  const onSubmit = async (data: IAdmin) => {
    console.log("입력된 값 : " + JSON.stringify(data));
    try {
      // await dispatch(authLogin(data))
      //   .then((res: any) => {
      //     alert("success to Login");
      //     console.log(res);
      //   })
      //   .then(() => {
      //     router.push("/");
      //   })
      //   .catch((error: any) => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen h-screen items-center justify-center"
      >
        <div
          id="login"
          className="font-roboto w-[25vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">
            Forgot Password
          </p>
          <div>
            <label htmlFor="email">
              <input
                type="text"
                id="email"
                placeholder="Email"
                {...register("email")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <button
              type="submit"
              className="w-[22vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Login
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login`)}
              className="text-gray-700 text-sm"
            >
              I know my password. Let me login.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
