import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { useLanguageSwitchContext } from "./context/LanguageSwitchContext";

export function Header() {
  const [showSettings, setShowSettings] = useState(false);
  // https://ttntm.me/blog/tailwind-responsive-menu/
  useEffect(() => {
    var nav = document.getElementById("site-menu");
    var header = document.getElementById("top");
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 400) {
        // adjust this value based on site structure and header image height
        nav?.classList.add("nav-sticky");
        header?.classList.add("pt-scroll");
      } else {
        nav?.classList.remove("nav-sticky");
        header?.classList.remove("pt-scroll");
      }
    });
  }, []);

  function navToggle() {
    var btn = document.getElementById("menuBtn");
    var nav = document.getElementById("menu");

    btn?.classList.toggle("open");
    nav?.classList.toggle("flex");
    nav?.classList.toggle("hidden");
  }

  return (
    <header
      id="top"
      className="w-full flex flex-col fixed sm:relative bg-black pin-t pin-r pin-l z-10 text-white"
    >
      <nav
        id="site-menu"
        className="flex flex-col sm:flex-row w-full justify-between items-center px-4 sm:px-6 py-1 bg-black shadow sm:shadow-none border-t-4 border-red-900"
      >
        <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
          <Link href="/">
            <span className="flex flex-row cursor-pointer items-center text-center">
              <img src="/logo-big.jpg" width={50} height={50}></img>
              <div className="ml-2">Wikigrisser Next</div>
            </span>
          </Link>

          <button
            id="menuBtn"
            className="hamburger block sm:hidden focus:outline-none"
            type="button"
            onClick={navToggle}
          >
            <span className="hamburger__top-bun"></span>
            <span className="hamburger__bottom-bun"></span>
          </button>
        </div>
        <div
          id="menu"
          className="w-full sm:w-auto self-end sm:self-center sm:flex flex-col sm:flex-row items-center h-full py-1 pb-4 sm:py-0 sm:pb-0 hidden"
        >
          {LINKS.map((link) => (
            <Link key={link.text} href={link.url}>
              <div className="text-gray-300 font-bold hover:text-white text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2 cursor-pointer">
                {link.text}
              </div>
            </Link>
          ))}
          <div onClick={() => setShowSettings(!showSettings)} className="self-start sm:self-center">
            <svg
              className="fill-current text-gray-300 hover:text-white cursor-pointer text-left"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </div>
          {showSettings && <SettingsMenu />}
        </div>
      </nav>
    </header>
  );
}

function SettingsMenu() {
  const languages = [
    {
      key: "english",
      name: "English",
    },
    { key: "russian", name: "Русский" },
  ];

  const { language, setLanguage } = useLanguageSwitchContext();

  const handleChangeLanguage = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };

  return (
    <div className="rounded bg-white px-2 ml-0 mt-2 sm:ml-2 sm:mt-0 self-start">
      <Select value={language} onChange={handleChangeLanguage}>
        {languages.map((v) => (
          <MenuItem key={v.key} value={v.key}>
            <div className="flex items-center">
              <img
                src={"/ui/" + v.key + ".svg"}
                alt={v.key}
                height="20"
                width="30"
              />
              <span className="ml-1">{v.name}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
const LINKS = [
  {
    text: "News",
    url: "/news",
  },
  {
    text: "Heroes",
    url: "/heroes/gallery",
  },
  {
    text: "Equipment",
    url: "/equipment",
  },
  {
    text: "Soldiers",
    url: "/soldiers",
  },
];
