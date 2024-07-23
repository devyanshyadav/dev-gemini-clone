import DevButton from "@/components/dev-components/dev-button";
import Image from "next/image";
import { GoSignOut } from "react-icons/go";
import { IoApps } from "react-icons/io5";
import { signOut, signIn } from '@/auth'
import { SiGooglegemini } from "react-icons/si";
import DevPopover from "../dev-components/dev-popover";
import Link from "next/link";
import ReactTooltip from "../dev-components/react-tooltip";

export default function SignInNow({ userData }: any) {
  const handleSign = async () => {
    'use server'
    await signIn('google')
  }
  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  const projects = [
    {
      name: 'Do paste',
      desr: 'Do-Paste allows users to share single pages that are editable by the creator and can be shared with everyone.',
      link: 'https://do-paste.vercel.app/',
    },
    {
      name: 'Devvarena',
      desr: 'Devvarena is a simple, powerful, and feature-packed frontend editor designed specifically for beginners.',
      link: 'https://devvarena.com/',
    },

    {
      name: 'Dev Gemini Clone',
      desr: 'Experience the power of AI with our Gemini-inspired assistant.',
      link: 'https://dev-gemini-clone.vercel.app/',
    }
    ,
    {
      name: 'CSS Button Generator',
      desr: 'Create custom CSS code for stylish and interactive buttons.',
      link: 'https://buttons.devvarena.com/',
    },
    {
      name: 'Palette Paradise ',
      desr: 'Manage color palettes for web designs with ease.',
      link: 'https://palette-paradise.devvarena.com/',

    },
    {
      name: 'CSS Box Shadows Generator',
      desr: 'Generate CSS code for custom box shadows.',
      link: 'https://box-shadows.devvarena.com/',

    },
    {
      name: 'CSS Glassmorphism Generator',
      desr: 'Create CSS code for the glassmorphism effect in UI design.',
      link: 'https://glassmorphism.devvarena.com/',

    }, {
      name: 'Codepen project',
      desr: 'All the codepen projects',
      link: "https://codepen.io/Devyansh-coder"
    }

  ]
  return (
    <div className="flex items-center gap-2">
      <DevButton variant="v1" className="gap-2 text-sm md:!flex !hidden">
        <SiGooglegemini className="text-lg text-[#D96570]" />
        Try Gemini Advanced
      </DevButton>
      <DevPopover
        place="bottom-start"
        contentClick={false}
        popButton={
          <ReactTooltip tipData={"Projects"}>
            <DevButton rounded="full" variant="v3" asIcon className="text-sm md:!block !hidden">
              <IoApps className="text-3xl p-[6px]" />
            </DevButton>
          </ReactTooltip>

        }
      >
        <div className="w-52 h-fit p-2">
          <h3>Other projects</h3>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {
              projects.map((item, i) => (
                <Link target="_blank" href={item.link} key={i} className="p-1 border rounded-md border-accentGray/30 hover:border-accentBlue/50 relative group">
                  <span className="absolute bottom-10 bg-slate-800 text-white p-[2px] border border-accentGray/30 px-3 -translate-x-1/2 left-1/2 text-sm rounded-md hidden group-hover:block text-nowrap">{item.name}</span>
                  <Image src={`/assets/projects-img/${i + 1}.png`} alt="img" width={35} height={35} className="cursor-pointer rounded-md" />
                </Link>
              ))
            }
          </div>
        </div>
      </DevPopover>
      <div>
        {
          userData ? (
            <DevPopover contentClick={false} place="bottom-start" popButton={<Image src={userData.image as string} alt={"img"} width={35} height={35} className="rounded-full cursor-pointer" />}>
              <form action={handleSignOut} className="py-2 w-48">
                <DevButton type="submit" rounded="none" variant="v3" className="!justify-start  w-full" >
                  <GoSignOut className="text-lg" />
                  Sign Out
                </DevButton>
              </form>
            </DevPopover>
          ) : (
            <form action={handleSign}>
              <DevButton
                type="submit"
                className="text-sm !bg-accentBlue/50"
              >
                Sign In
              </DevButton>
            </form>

          )
        }
      </div>
    </div>
  );
}