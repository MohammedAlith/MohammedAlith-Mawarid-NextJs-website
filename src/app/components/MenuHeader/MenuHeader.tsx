"use client"
import Sidenav from "./SideNav";
import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";


export default function MenuHeader() {
  const locale = useLocale() as "ar" | "en";
  let pathname = usePathname(); 
    // const searchParams = useSearchParams();
 
  // Determine the other locale
  const otherLocale = locale === "ar" ? "en" : "ar";

let newPath = pathname;
  if (locale === "ar" && pathname.startsWith("/ar")) {
    newPath = pathname.replace("/ar", "/en");
  } else if (locale === "en" && pathname.startsWith("/en")) {
    newPath = pathname.replace("/en", "/ar");
  } else {
    newPath = `/${otherLocale}`;
  }

  const texts = {
    about: locale === "ar" ? "عن الموارد" : "ABOUT MAWARID",
    services: locale === "ar" ? "الخدمات" : "SERVICES",
    achievement: locale === "ar" ? "الإنجازات" : "ACHIEVEMENT",
    contact: locale === "ar" ? "تواصل معنا" : "CONTACT US",
    investor: locale === "ar" ? "علاقات المستثمرين" : "INVESTOR RELATIONS",
    language: otherLocale === "ar" ? "ع" : "En", // display the other locale
    profile: locale === "ar" ? "الملف التعريفي" : "Profile",
  };

  return (
    <div className="container mx-auto flex sm:flex-shrink-1 px-4  xl:px-18 justify-between items-center py-6 sticky top-0 bg-white z-1000 w-screen">
      {/* Mobile menu */}
      <div className="pt-3 xl:hidden relative">
        <Sidenav />
      </div>

      {/* Logo */}
      <div>
        <a href="#">
          <img
            src="https://mawarid.com.sa/assets/images/logo.png"
            alt="logo"
            width={130}
            height={130}

          />
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden xl:block">
        <ul className="flex gap-4 h-full items-center justify-center w-full text-sm font-bold pt-2">
          <li className="hover:text-[#fdbd3f] flex gap-3">
            <a href="#">{texts.about}</a>
            <div className="bg-[#fdbd3f] w-1"></div>
          </li>
          <li className="hover:text-[#fdbd3f] flex gap-3">
            <a href="#">{texts.services}</a>
            <div className="bg-[#fdbd3f] w-1"></div>
          </li>
          <li className="hover:text-[#fdbd3f] flex gap-3">
            <a href="#">{texts.achievement}</a>
            <div className="bg-[#fdbd3f] w-1"></div>
          </li>
          <li className="hover:text-[#fdbd3f] flex gap-3">
            <a href="#">{texts.contact}</a>
            <div className="bg-[#fdbd3f] w-1"></div>
          </li>
          <li className="hover:text-[#fdbd3f] flex gap-3">
            <a href="#">{texts.investor}</a>
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="flex gap-1 xl:gap-2 h-full items-center pt-2">
        {/* Language Switch Button */}
        <Link href={newPath}  locale={otherLocale}>
          <button className="bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-2 text-center xl:px-2 xl:py-1">
            {texts.language}
          </button>
        </Link>

        {/* Profile Button */}
        <a href="https://mawarid.com.sa/assets/MawaridProfile2025%20-%20English.pdf">
          <button className="bg-[#fdbd3f] border-2 hover:bg-transparent border-[#fdbd3f] px-1  xl:py-1 text-center xl:text-center ">
            {texts.profile}
          </button>
        </a>
      </div>
    </div>
  );
}
