export type Message = {
    userPrompt: string;
    llmResponse:string;
    imgName?:string;
}

export type SessionProps = {
    email: string;
    id: string;
    name: string;
    image: string;
}

export type MessageProps = {
    _id: string,
    message: Message
}

export type ChatSectionProps = {
    data: {
        message?: MessageProps[]
    },
    image: string,
    name: string
}