
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import AudioWaveform from './AudioWaveform';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
  className?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscription,
  isListening,
  onListeningChange,
  className
}) => {
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      
      if (transcript.trim()) {
        onTranscription(transcript.trim());
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        setError('Microphone access was denied. Please allow microphone access to use this feature.');
      } else {
        setError(`Error occurred in speech recognition: ${event.error}`);
      }
      stopListening();
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscription]);

  const startListening = () => {
    if (recognitionRef.current) {
      setError(null);
      try {
        recognitionRef.current.start();
        onListeningChange(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setError('Failed to start speech recognition');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Failed to stop speech recognition:', err);
      }
      onListeningChange(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {error && (
        <div className="text-destructive mb-2 text-center max-w-md">
          {error}
        </div>
      )}
      
      <div className="relative flex flex-col items-center">
        <AudioWaveform isActive={isListening} className="mb-4" />
        
        <Button
          size="lg"
          variant={isListening ? "destructive" : "default"}
          className={cn(
            "rounded-full p-6 h-auto w-auto",
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-voice-primary hover:bg-voice-secondary"
          )}
          onClick={toggleListening}
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? (
            <MicOff className="h-8 w-8" />
          ) : (
            <Mic className="h-8 w-8" />
          )}
        </Button>
        
        <span className="mt-4 font-medium">
          {isListening ? "Listening..." : "Tap to Speak"}
        </span>
      </div>
    </div>
  );
};

export default VoiceRecorder;
