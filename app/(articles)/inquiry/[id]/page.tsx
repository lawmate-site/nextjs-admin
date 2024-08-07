"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const InquirySinglePage = (props: any) => {
  const router = useRouter();
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
              onClick={() => router.push("/inquiry/answer")}
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
            건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1건의사항1
          </h1>
          <div className="flex flex-col gap-7">
            <div className="flex flex-row justify-between border-b py-7">
              <p>사용자1사용자1사용자1사용자1사용자1사용자1사용자1사용자1</p>
              <div>
                <p>2022-01-01</p>
              </div>
            </div>
          </div>
          <p className="font-light text-lg">건의사항1 내용</p>
        </div>
      </div>
    </>
  );
};

export default InquirySinglePage;
