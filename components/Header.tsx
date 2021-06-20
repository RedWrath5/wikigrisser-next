import Link from "next/link";
import { useEffect } from "react";

export function Header() {
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
          <img src="/logo-big.jpg" width={50} height={50}></img>
          <div className="ml-2">
            <Link href="/">Wikigrisser Next</Link>
          </div>

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
          <div className="text-dark font-bold hover:text-red text-lg w-full no-underline sm:w-auto sm:pr-4 py-2 sm:py-1 sm:pt-2">
            <Link href="/heroes/gallery">Heroes</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
