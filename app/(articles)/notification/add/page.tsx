"use client";

import { IAdminBoard } from "@/components/_model/admin/admin";
import { save } from "@/components/_service/admin/admin.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NorificationAddPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [selectBoard, setSelectBoard] = useState({
    title: "",
    content: "",
    writer: "작성자1",
  } as IAdminBoard);

  const submit = async () => {
    const formData = new FormData();

    console.log(selectBoard);
    formData.append("boardDto", JSON.stringify(selectBoard));

    console.log(formData.get("boardDto"));

    console.log(selectedFile);

    if (selectedFile.length == 0) {
      alert("파일을 선택해주세요.");
      return 0;
    }

    selectedFile.forEach((file) => {
      formData.append("files", file, file.name);
    });

    console.log(formData.get("files"));

    try {
      await dispatch(save(formData));

      router.push("/notification");
    } catch (error) {
      console.log(error);

      return error;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <div className=" border border-black w-[50vw] p-10">
          <h1 className=" text-[32px] border-b-2 p-4">공지사항 글쓰기</h1>
          <input
            placeholder="제목을 입력하세요."
            className=" mt-10 w-[45vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                title: event.target.value,
              })
            }
          />
          <textarea
            className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
            onChange={(event: any) =>
              setSelectBoard({
                ...selectBoard,
                content: event.target.value,
              })
            }
          ></textarea>
          <input
            type="file"
            className="mt-4"
            onChange={(event: any) => {
              setSelectedFile(Array.from(event.target.files));
            }}
            multiple
          />
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
