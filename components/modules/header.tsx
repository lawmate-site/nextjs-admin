"use client";

import { useState, useEffect } from "react";
import { iconsCSS, rounded } from "../common/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuPage from "@/app/menues/page";
import { parseCookies } from "nookies";

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = parseCookies().accessToken;

  const checkAuthentication: any = async () => {
    // const accessToken: any = await getAccessToken();
    // setIsLoggedIn(!!cookies);
    if (cookies !== undefined) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    console.log(cookies);
    return cookies;
  };

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <nav
          className={`items-center fixed top-0 h-10 w-screen z-20 flex flex-row justify-between `}
        >
          <div className={`flex flex-row items-center `}>
            <div className={`${rounded} relative`}>
              {isDropdownOpen.menu ? (
                <>
                  <Image
                    src="https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
                    onClick={() => handleMenu()}
                    width={20}
                    height={20}
                    alt="arrow-right"
                    className="z-20"
                  />
                  <MenuPage />
                </>
              ) : (
                <Image
                  src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000"
                  onClick={() => handleMenu()}
                  width={20}
                  height={20}
                  alt="arrow-right"
                  className="z-20"
                />
              )}
            </div>
          </div>
        </nav>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Header;
