import { auth } from "@/auth";
import { getSidebarChat } from "@/actions/actions";
import React from "react";
import SideBar from "@/components/sidebar-components/sidebar";
import Header from "@/components/header-components/header";
import InputPrompt from "@/components/input-prompt-components/input-prompt";
import DevToast from "@/components/dev-components/dev-toast";

const GeneralLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const sidebarList = await getSidebarChat(session?.user?.id as string);

  return (
    <main className="h-dvh w-full flex overflow-hidden">
      <SideBar user={session?.user} sidebarList={sidebarList} />
      <div className="flex flex-grow h-full overflow-hidden flex-col justify-between relative">
        <Header />
        <section className="w-full flex-grow overflow-y-auto relative mx-auto">
          {children}
        </section>
          <InputPrompt user={session?.user} />
      </div>
      <DevToast/>
    </main>
  );
};

export default GeneralLayout;
