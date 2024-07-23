'use client'
import React from 'react';
import DevPopover from '../dev-components/dev-popover';
import DevButton from '../dev-components/dev-button';
import { LuSlidersHorizontal } from "react-icons/lu";
import ReactTooltip from '../dev-components/react-tooltip';
import { MdOutlineShortText } from 'react-icons/md';
import { BsTextLeft } from 'react-icons/bs';
import { PiSuitcaseSimple, PiUmbrella } from "react-icons/pi";
import { CgPlayListCheck } from 'react-icons/cg';
import geminiZustand from '@/utils/gemini-zustand';

const PROMPT_TYPES: { [key: string]: string } = {
    Longer: "Lengthen",
    Shorter: "Shorten",
    Simplify: "Simplify",
    Elaborate: "Elaborate on",
    Formalize: "Make more formal",
};

const ModifyResponse = ({ chatUniqueId, llmResponse }: { chatUniqueId: string, llmResponse: string }) => {
    const { setCurrChat } = geminiZustand();

    const modifyButtons = [
        { icon: MdOutlineShortText, label: 'Shorter', promptType: 'Shorter' },
        { icon: BsTextLeft, label: 'Longer', promptType: 'Longer' },
        { icon: CgPlayListCheck, label: 'Simple', promptType: 'Simplify' },
        { icon: PiUmbrella, label: 'Simpler', promptType: 'Simplify' },
        { icon: PiSuitcaseSimple, label: 'Professional', promptType: 'Formalize' },
    ];

    const handleButtonClick = (promptType: string) => {
        setCurrChat("userPrompt", `${PROMPT_TYPES[promptType]} this response: ${llmResponse}`);
    };

    return (
        <DevPopover
            place="top-start"
            popButton={
                <ReactTooltip tipData="Modify response">
                    <DevButton asIcon
                        rounded="full"
                        size="lg"
                        variant="v2"
                        className="opacity-80">
                        <LuSlidersHorizontal />
                    </DevButton>
                </ReactTooltip>
            }
        >
            <div className='w-48 py-2'>
                <p className='px-2 text-sm font-light'>Generate Response</p>
                {modifyButtons.map(({ icon: Icon, label, promptType }) => (
                    <DevButton
                        key={label}
                        variant="v3"
                        onClick={() => handleButtonClick(promptType)}
                        className="text-md group !w-full !justify-start gap-3"
                        rounded="none"
                    >
                        <Icon className="text-xl" /> {label}
                    </DevButton>
                ))}
            </div>
        </DevPopover>
    );
};

export default ModifyResponse;
