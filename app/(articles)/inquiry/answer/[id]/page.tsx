"use client";

import {
  getInquiryById,
  sendInquiry,
} from "@/components/_service/admin/admin.service";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InquiryAnswerPage: NextPage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectBoard, setSelectBoard] = useState({
    category: "결제/쿠폰",
    content: "한불부탁드립니다~",
    email: "refund@refund.com",
    id: "66b6e7ff306d7d1feeb94877",
    title: "포인트가 충전이 안됐어요 환불 해주세요",
  });

  const getNotifications = async () => {
    try {
      const response = await dispatch(getInquiryById(props.params.id));
      console.log(response);
      if (response) setSelectBoard(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    console.log(selectBoard);
    try {
      const response = await dispatch(sendInquiry());
      console.log(response);
      if (response) setSelectBoard(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

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
                    email: event.target.value,
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
