"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "animate.css";
import { useDispatch } from "react-redux";
import { saveVisits } from "@/components/_service/admin/admin.service";
import ChatList from "../components/common/chat/ChatList";
import BeforeLoginedPage from "./(main)/page.beforelogin";
import AfterLoginedPage from "./(main)/afterLogin/page";
import { parseCookies } from "nookies";

const lawyers = [
  { id: "lawyer1", name: "Lawyer 1" },
  { id: "lawyer2", name: "Lawyer 2" },
  { id: "lawyer3", name: "Lawyer 3" },
];

export default function Home(props: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = "user1";

  const [isLoginned, setIsLoginned] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(saveVisits()).then((res: any) => {
        console.log(res);
      });
    };
  }, []);

  const token = parseCookies().accessToken;

  useEffect(() => {
    console.log(token);
    if (token !== undefined) {
      setIsLoginned(true);
    } else {
      setIsLoginned(false);
    }
  });

  return (
    <>
      <div className={`flex flex-col justify-center items-center relative`}>
        {isLoginned ? (
          <>
            <AfterLoginedPage />
          </>
        ) : (
          <>
            <BeforeLoginedPage />
          </>
        )}
        {/* <ChatList lawyers={lawyers} currentUser={currentUser} /> */}
      </div>
    </>
  );
}
