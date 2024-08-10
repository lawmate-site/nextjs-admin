"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { IAdmin } from "@/components/_model/admin/admin";
import { adminSave } from "@/components/_service/admin/admin.service";
import { useForm } from "react-hook-form";

function Join() {
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

  const options = [
    { value: "super", label: "super" },
    { value: "normal", label: "normal" },
  ];

  const onSubmit = async (data: IAdmin) => {
    console.log("입력된 값 : " + JSON.stringify(data));
    try {
      await dispatch(adminSave(data))
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-screen h-screen items-center justify-center"
      >
        <div
          id="login"
          className="font-roboto w-[37vw] border border-gray-700 flex flex-col gap-3 items-baseline bg-[var(--color-Harbor-firth)] p-7"
        >
          <p className=" text-[28px] font-medium align-middle">회원가입</p>
          <div>
             <label
              htmlFor="email"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="text-[22px] font-medium">이메일</p>
              <input
                type="text"
                id="email"
                placeholder="Email"
                {...register("email")}
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
                placeholder="Password"
                {...register("password")}
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
                placeholder="Name"
                {...register("name")}
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
              />
            </label>
            <label
              htmlFor="role"
              className="flex flex-row items-center justify-between w-[33vw]"
            >
              <p className="w-[11vw] text-[22px] font-medium">분야</p>
              <select
                className="w-[22vw] h-[5vh] border border-[var(--color-Harbor-first)] px-[1.111vw] mb-[1.111vh] bg-white"
                style={{ flexBasis: 0, flexGrow: 1 }}
                value={watch("role")}
                id="role"
                {...register("role")}
                name="role"
              >
<option value="">--Please choose an option--</option>
                <option value="HD">Human Resources</option>
                <option value="R&D">Research Delevelop</option>
                <option value="CS">Customer Service</option>
                <option value="LD">Legal Department</option>
              </select>
            </label>
            <button
              type="submit"
              className="w-[33vw] h-[5vh] bg-white border border-[var(--color-Harbor-first)] hover:bg-[var(--color-Harbor-first)] hover:text-white  font-bold"
            >
              Join
            </button>
          </div>
          <div className="w-[22vw] flex flex-col p-[1.111vh]">
            <p
              onClick={() => router.push(`/login`)}
              className="text-gray-700 text-sm"
            >
              Already Joined?
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default Join;
