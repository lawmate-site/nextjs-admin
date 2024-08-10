"use client";

import { getInquiryById } from "@/components/_service/admin/admin.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InquirySinglePage = (props: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState({
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
      if (response) setNotifications(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <div className={`w-[1400px] `}>
        <div className="flex flex-col pt-20 gap-10">
          <div className="flex flex-row justify-between items-center">
            <p
              className="flex flex-row gap-2 items-center"
              onClick={() => router.push("/inquiry")}
            >
              <Image
                src={
                  "https://img.icons8.com/?size=100&id=60636&format=png&color=000000"
                }
                alt={"left-arrow"}
                width={20}
                height={20}
              />
              이전으로 돌아가기
            </p>
            <p
              className="flex flex-row gap-2 items-center"
              onClick={() => router.push(`/inquiry/answer/${props.params.id}`)}
            >
              답변 쓰기
              <Image
                src={
                  "https://img.icons8.com/?size=100&id=60671&format=png&color=000000"
                }
                alt={"right-arrow"}
                width={20}
                height={20}
              />
            </p>
          </div>
          <h1 className="font-bold text-4xl leading-snug">
            [{notifications?.category}] {notifications?.title}
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>{notifications?.email}</p>
              <div></div>
            </div>
          </div>
          <p className="font-light text-lg">{notifications?.content}</p>
        </div>
      </div>
    </>
  );
};

export default InquirySinglePage;
