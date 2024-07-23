'use client'
import React from 'react'
import {
    WhatsappShareButton, TwitterShareButton, LinkedinShareButton,
    FacebookShareButton, EmailShareButton, TelegramShareButton, RedditShareButton,
    WhatsappIcon, XIcon, LinkedinIcon, FacebookIcon, EmailIcon, TelegramIcon, RedditIcon
} from "react-share";
import DevPopover from '../dev-components/dev-popover'
import ReactTooltip from '../dev-components/react-tooltip'
import DevButton from '../dev-components/dev-button'
import { IoMdShare } from 'react-icons/io'

const ShareChat = ({ shareMsg }: { shareMsg: string }) => {
    const shareConfig = [
        {
            shareWrapper: WhatsappShareButton,
            shareIcon: WhatsappIcon,
        },
        {
            shareWrapper: TwitterShareButton,
            shareIcon: XIcon,
        },
        {
            shareWrapper: LinkedinShareButton,
            shareIcon: LinkedinIcon,
        },
        {
            shareWrapper: FacebookShareButton,
            shareIcon: FacebookIcon,
        },
        {
            shareWrapper: TelegramShareButton,
            shareIcon: TelegramIcon,
        },
        {
            shareWrapper: RedditShareButton,
            shareIcon: RedditIcon,
        },
        {
            shareWrapper: EmailShareButton,
            shareIcon: EmailIcon,
        }
    ]
    return (
        <DevPopover place='top' popButton={<ReactTooltip tipData="share chat">
            <DevButton asIcon
                rounded="full"
                size="lg"
                variant="v2"
                className="opacity-80">
                <IoMdShare />
            </DevButton>
        </ReactTooltip>}>
            <div role="icon-group" className='flex items-center p-2 flex-wrap gap-2'>
                {shareConfig && shareConfig.map((share, index) => (
                    <share.shareWrapper url={shareMsg} key={index} >
                        <share.shareIcon className="border border-accentBlue/50 hover:border-accentBlue rounded-full p-[2px] hover:scale-105 transition-all" size={40} round={true} />
                    </share.shareWrapper>
                ))}
            </div>
        </DevPopover>
    )
}

export default ShareChat