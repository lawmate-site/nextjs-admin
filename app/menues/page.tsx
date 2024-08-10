"use client";

import { authLogout } from "@/components/_service/admin/admin.service";
import "animate.css";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { title } from "process";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const MenuPage = (props: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [animate, setAnimate] = useState(
    "animate__animated animate__fadeInLeft"
  );
  const refreshToken = parseCookies().refreshToken;

  const MenuAfterLogin = [
    {
      key: "1",
      title: "Dashboard",
      icon: "https://img.icons8.com/?size=100&id=yBugi9w42EET&format=png&color=000000",
      router: "/afterLogin",
      children: [],
    },
    {
      key: "2",
      title: "Management Board",
      router: "",
      icon: "https://img.icons8.com/?size=100&id=123484&format=png&color=000000",
      children: [
        {
          key: 2.1,
          title: "건의사항",
          path: "/inquiry",
          icon: "https://img.icons8.com/?size=100&id=646&format=png&color=000000",
          onclick: "",
        },
      ],
    },
    {
      key: "3",
      title: "Management User",
      router: "",
      icon: "https://img.icons8.com/?size=100&id=_MQKSTt2WaFN&format=png&color=000000",
      children: [
        {
          key: 3.1,
          title: "변호사",
          path: "/management/lawyer",
          icon: "https://img.icons8.com/?size=100&id=vJChIOXZSi8F&format=png&color=000000",
          onclick: "",
        },
        {
          key: 3.2,
          title: "사용자",
          path: "/management/user",
          icon: "https://img.icons8.com/?size=100&id=85167&format=png&color=000000",
          onclick: "",
        },
        {
          key: 3.3,
          title: "관리자",
          path: "/management/admin",
          icon: "https://img.icons8.com/?size=100&id=100521&format=png&color=000000",
          onclick: "",
        },
      ],
    },
    {
      key: "4",
      title: "User",
      icon: "https://img.icons8.com/?size=100&id=98957&format=png&color=000000",
      router: "",
      children: [
        {
          key: 4.1,
          title: "로그아웃",
          path: "",
          icon: "https://img.icons8.com/?size=100&id=42374&format=png&color=000000",
          onclick: "logout",
        },
      ],
    },
  ];

  const handleLogOut = () => {
    console.log({ refreshToken });
    dispatch(authLogout(refreshToken)).then((res: any) => {
      console.log(res);
      destroyCookie({}, "accessToken");
      destroyCookie({}, "refreshToken");
      window.location.replace("/");
    });
  };

  useEffect(() => {
    if (props.menu === true) {
      setAnimate("animate__animated animate__fadeInLeft fast");
    }
  }, [props.menu]);

  return (
    <>
      <div
        className={`${animate} border-r-2 border-[var(--color-Harbor-sec)] z-0 bg-[var(--color-Harbor-firth)] fixed top-0 left-0 font-bold text-[var(--color-Harbor-first)] w-[20vw] h-full py-20`}
      >
        <div className="flex flex-col items-center justify-between h-full w-full">
          <div className="flex flex-col items-center gap-5">
            {MenuAfterLogin.map((item: any) => (
              <>
                <div
                  key={item.key}
                  onClick={() => item.router !== "" && router.push(item.router)}
                >
                  <div className="flex flex-row gap-3 items-center w-[20vw] px-5 pb-2 border-b border-[var(--color-Harbor-sec)]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={20}
                      height={20}
                    />
                    <h1 className="text-xl">{item.title}</h1>
                  </div>
                  {item.children.length > 0 && (
                    <div className="flex flex-col gap-2 p-5">
                      {item.children?.map((child: any) => (
                        <div
                          key={child.key}
                          onClick={() => {
                            if (child.onclick === "logout") {
                              handleLogOut();
                            }
                            router.push(child.path);
                          }}
                          className="flex flex-row justify-between items-center w-full px-2 group"
                        >
                          <div className="flex flex-row items-center gap-3">
                            <Image
                              src={child.icon}
                              alt={child.title}
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                            <h1 className="group-hover:animate-bounce-left group-hover:text-cyan-900 text-lg">
                              {child.title}
                            </h1>
                          </div>
                          <p className="group-hover:text-cyan-700 font-light text-[12px] items-center justify-center flex flex-row gap-2">
                            <Image
                              src="https://img.icons8.com/?size=100&id=86517&format=png&color=000000"
                              width={12}
                              height={12}
                              alt="arrow-right"
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
          <div
            className="text-2xl cursor-pointer"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            LAWMATE LOGO
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
