"use client";

import { useState, useEffect } from "react";
import { iconsCSS, rounded } from "../common/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAccessToken } from "./cookies";
import Image from "next/image";
import MenuPage from "@/app/menues/page";

const Header = ({ isDropdownOpen, setIsDropdownOpen }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication: any = async () => {
    const accessToken: any = await getAccessToken();
    setIsLoggedIn(!!accessToken);
    return accessToken;
  };

  const handleMenu = () => {
    setIsDropdownOpen({
      ...isDropdownOpen,
      menu: !isDropdownOpen.menu,
    });
  };

  const handleLogOut = () => {};

  useEffect(() => {
    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn || window.location.pathname === "/afterLogin" ? (
        <nav
          className={`items-center fixed top-0 h-10 w-screen z-20 flex flex-row justify-between `}
        >
          <div className={`flex flex-row items-center `}>
            <div className={`${rounded} relative`} onClick={() => handleMenu()}>
              {isDropdownOpen.menu ? (
                <>
                  <Image
                    src="https://img.icons8.com/?size=100&id=9433&format=png&color=000000"
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
