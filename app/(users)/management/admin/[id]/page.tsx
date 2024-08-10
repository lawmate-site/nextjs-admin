"use client";

import { ISendMail } from "@/components/_model/admin/admin";
import { sendMail } from "@/components/_service/admin/admin.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NorificationAddPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = decodeURIComponent(props.params.id);

  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [selectBoard, setSelectBoard] = useState({
    to: email,
    subject: "",
    text: "",
  } as ISendMail);

  const submit = async () => {
    const formData = new FormData();

    formData.append("boardDto", JSON.stringify(selectBoard));

    try {
      await dispatch(sendMail(selectBoard)).then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className=" border border-black w-[50vw] p-10">
          <h1 className=" text-[32px] border-b-2 p-4">
            {decodeURIComponent(email)}에게 글쓰기
          </h1>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">제목</p>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  subject: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row items-center justify-between mt-3">
            <p className="text-xl">이메일</p>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              value={decodeURIComponent(email)}
              className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  to: event.target.value,
                })
              }
            />
          </div>
          <textarea
            className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                text: event.target.value,
              })
            }
          ></textarea>
          <input
            type="submit"
            value="제출하기"
            className="mt-4 bg-black text-white w-[45vw] h-[44px] rounded-xl"
            onClick={submit}
          />
        </div>
      </div>
    </>
  );
};

export default NorificationAddPage;
