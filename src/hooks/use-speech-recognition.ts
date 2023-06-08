import { useRef, useState } from 'react';

export type SpeechRecognitionCustomResult = {
  transcript: string;
  confidence: number;
};

type SpeechRecognitionOptions = {
  lang?: string;
};

export const useSpeechRecognition = (options?: SpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SpeechRecognitionCustomResult | null>(null);

  const recognition = useRef<SpeechRecognition | null>(null);

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Speech recognition is not supported in this browser');

      return;
    }

    recognition.current = new webkitSpeechRecognition();

    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = options?.lang || 'en-US';

    recognition.current.onstart = () => {
      setIsListening(true);
    };

    recognition.current.onend = () => {
      setIsListening(false);
    };

    recognition.current.onresult = event => {
      const transcript = event.results[0][0].transcript;

      const confidence = event.results[0][0].confidence;

      const recognitionResult: SpeechRecognitionCustomResult = {
        transcript,
        confidence
      };

      setResult(recognitionResult);
    };

    recognition.current.start();
  };

  const stopSpeechRecognition = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, result, startSpeechRecognition, stopSpeechRecognition };
};
