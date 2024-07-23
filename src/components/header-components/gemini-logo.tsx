
import { FaCaretDown, FaRegCheckCircle } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import DevButton from "../dev-components/dev-button";
import DevPopover from "../dev-components/dev-popover";

const GeminiLogo = () => {
    return (
      <DevPopover
        popButton={
          <DevButton size="sm" rounded="sm" className="text-lg gap-2">
            Gemini
            <FaCaretDown />
          </DevButton>
        }
      >
        <div className=" py-2">
          <DevButton
            variant="v3"
            className="w-full !justify-between gap-3 group"
            rounded="none"
          >
            <span className="flex items-center gap-2">
              <SiGooglegemini className="text-lg text-[#4E82EE]" />
              Gemini
            </span>
            <FaRegCheckCircle className="text-xl" />
          </DevButton>
          <DevButton
            ripple={false}
            className="cursor-auto w-full !justify-start gap-3 group"
            rounded="none"
          >
            <span className="flex items-center gap-2 opacity-50">
              <SiGooglegemini className="text-lg text-[#D96570]" />
              Gemini Advanced
            </span>
  
            <DevButton variant="v1" rounded="sm">
              Upgrade
            </DevButton>
          </DevButton>
        </div>
      </DevPopover>
    );
  };

  export default GeminiLogo
  