"use client";

import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const InquiryAnswerPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectBoard, setSelectBoard] = useState({
    title: "건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1",
    content: "건의사항1 내용",
    writer: "작성자1",
    email: "작성자1 이메일",
    answerWriter: "답변자1",
  });

  const submit = async () => {
    console.log(selectBoard);
    // const formData = new FormData();
    // formData.append("boardDto", JSON.stringify(selectBoard));
    // if (selectedFile.length == 0) {
    //   alert("파일을 선택해주세요.");
    //   return 0;
    // }
    // Array.from(selectedFile).forEach((file: File) => {
    //   formData.append("files", file);
    // });
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8082/board/save",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     alert("파일이 성공적으로 등록되었습니다.");
    //     router.push("/notification");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <>
        <div className="flex flex-col items-center pt-20">
          <div className=" border border-black w-[50vw] p-10">
            <div>
              <h1 className=" text-3xl border-b-2 p-4">건의사항 답변하기</h1>
            </div>
            <div className="flex flex-row items-center justify-between mt-3">
              <p className="text-xl">제목</p>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                value={selectBoard.title + "에 대한 답변"}
                className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
                onChange={(event: any) =>
                  setSelectBoard({
                    ...selectBoard,
                    title: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-row items-center justify-between mt-3">
              <p className="text-xl">이메일</p>
              <input
                type="email"
                placeholder="이메일을 입력하세요."
                value={selectBoard.email}
                className="w-[42vw] border border-black rounded-xl h-[44px] px-4 focus:outline-none"
                onChange={(event: any) =>
                  setSelectBoard({
                    ...selectBoard,
                    title: event.target.value,
                  })
                }
              />
            </div>
            <textarea
              placeholder="내용을 입력하세요."
              value={selectBoard.content}
              className=" mt-4 border border-black rounded-lg w-[45vw] h-[50vh] px-4 focus:outline-none p-4"
              onChange={(event: any) =>
                setSelectBoard({
                  ...selectBoard,
                  content: event.target.value,
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
    </>
  );
};

export default InquiryAnswerPage;
