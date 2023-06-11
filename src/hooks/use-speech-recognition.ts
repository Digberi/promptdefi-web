import { useRef, useState } from 'react';

import { tokens } from '@/config/tokens';

export type SpeechRecognitionCustomResult = {
  transcript: string;
  confidence: number;
};

type SpeechRecognitionOptions = {
  lang?: string;
};

const grammar = `
  #JSGF V1.0; grammar cryptoDefi; public <term> =
    bitcoin | ethereum | ripple | litecoin | dogecoin |
    blockchain | smart contract | decentralized finance | yield farming |
    liquidity pool | stablecoin | decentralized exchange ;
`;

const tokenSymbolsGrammar = `
  #JSGF V1.0; grammar tokenSymbols; public <term> =
  ${tokens.map(token => token.symbol).join(' | ')} ;
  `;

const isSpeechRecognitionListSupported = 'webkitSpeechGrammarList' in window;

const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window;

export const useSpeechRecognition = (options?: SpeechRecognitionOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<SpeechRecognitionCustomResult | null>(null);

  const recognition = useRef<SpeechRecognition | null>(null);

  const startSpeechRecognition = () => {
    recognition.current = new webkitSpeechRecognition();

    if (isSpeechRecognitionListSupported) {
      const speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 10);
      speechRecognitionList.addFromString(tokenSymbolsGrammar, 100);
      recognition.current.grammars = speechRecognitionList;
    }
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
  const isSupported = isSpeechRecognitionSupported;

  return { isListening, result, isSupported, startSpeechRecognition, stopSpeechRecognition };
};
