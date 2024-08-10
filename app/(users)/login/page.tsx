"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IAdmin } from "@/components/_model/admin/admin";
import { useForm } from "react-hook-form";
import { authLogin } from "@/components/_service/admin/admin.service";
import { setCookie } from "nookies";

const Login = () => {
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
      await dispatch(authLogin(JSON.stringify(data)))
        .then((res: any) => {
          alert("success to Login");
          console.log(res);
          setCookie({}, "accessToken", res.payload.accessToken, {
            httpOnly: false,
            path: "/",
          });
          setCookie({}, "refreshToken", res.payload.refreshToken, {
            httpOnly: false,
            path: "/",
          });
        })
        .then(() => {
          window.location.replace("/");
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen h-screen items-center justify-center"
      >
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
                placeholder="Email"
                {...register("email")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    handleSubmit(onSubmit);
                  }
                }}
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
      </form>
    </>
  );
};

export default Login;
