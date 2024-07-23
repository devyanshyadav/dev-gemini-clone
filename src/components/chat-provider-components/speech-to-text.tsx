import geminiZustand from '@/utils/gemini-zustand';
import React, { useState, useEffect } from 'react';
import { IoMdMic } from 'react-icons/io';
import DevButton from '../dev-components/dev-button';
import ReactTooltip from '../dev-components/react-tooltip';

// Declare the necessary types
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    start(): void;
    stop(): void;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
}


const SpeechToText: React.FC = () => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [isMicAvailable, setIsMicAvailable] = useState<boolean>(false);
    const { currChat, setCurrChat, setToast } = geminiZustand()

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognitionInstance = new (window as any).webkitSpeechRecognition() as SpeechRecognition;
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const currentTranscript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                setCurrChat("userPrompt", currentTranscript);
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                if (event.error === 'not-allowed') {
                    setToast('Microphone access denied');
                    setIsMicAvailable(false);
                } else {
                    setToast('Unable to access the microphone');
                }
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
            setIsMicAvailable(true);
        } else {
            setToast('Speech recognition is not supported in this browser');
        }
    }, []);

    const toggleListening = () => {
        if (recognition && isMicAvailable) {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
            setIsListening(!isListening);
        } else if (!isMicAvailable) {
            setToast('Microphone is not available');
        }
    };

    const isActive = recognition && isMicAvailable && isListening;
    return (
        <ReactTooltip tipData="Use mic">

            <DevButton
                rounded="full"
                asIcon
                onClick={toggleListening}
                variant="v3"
                className={`
                translate-x-2 self-end p-2 active:!bg-blue-500/50 
                border-4 border-transparent
                ${isActive ? "animate-pulse-border !bg-blue-500/30" : ""}
            `}
                style={{
                    animation: isActive ? 'pulse-border 2s infinite' : 'none'
                }}
            >
                <IoMdMic className="text-2xl" />
            </DevButton>

        </ReactTooltip>
    );
};

export default SpeechToText;