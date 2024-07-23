import React from "react";
import SignInNow from "@/components/header-components/signin-now";
import { auth } from "@/auth";
import TopLoader from "./top-loader";
import GeminiLogo from "./gemini-logo";
import { IoMdAdd } from "react-icons/io";
import DevButton from "../dev-components/dev-button";


const Header = async () => {
  const session = await auth();
  return (
    <header className="w-full h-fit flex-shrink-0 flex items-center p-3 md:px-10 px-5 md:justify-between relative justify-end">
      <div className="md:block hidden">
        <GeminiLogo />
      </div>
     
      <SignInNow userData={session?.user} />
      <TopLoader />
    </header>
  );
};

export default Header;
