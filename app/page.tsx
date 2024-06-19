"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import "animate.css";
import Image from "next/image";

export default function Home(props: any) {
  const router = useRouter();
  const [isOpenLawLaw, setIsOpenLawLaw] = useState(false);

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
        <div className="flex flex-col justify-center items-center">
          여기는 admin page 입니다.
        </div>
      </div>
    </>
  );
}
