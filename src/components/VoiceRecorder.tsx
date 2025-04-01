
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import AudioWaveform from './AudioWaveform';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(true);
  
  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    
    if (!isSpeechRecognitionSupported) {
      setIsRecognitionSupported(false);
      setError('Your browser does not support voice recognition. Try Chrome, Edge, or Safari.');
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
        setError('Please allow microphone access to use voice features.');
        toast.error('Microphone access was denied. Please check your browser settings.');
      } else if (event.error === 'no-speech') {
        // Don't show this as an error, it's common and expected
        console.log('No speech detected');
      } else {
        setError(`Error with speech recognition: ${event.error}`);
        console.error('Speech recognition error:', event.error);
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
        toast.error('Failed to start speech recognition. Please try again.');
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
    if (!isRecognitionSupported) {
      toast.error('Voice recognition is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const renderContent = () => {
    if (!isRecognitionSupported) {
      return (
        <div className="text-center space-y-4">
          <div className="text-destructive font-medium">
            Voice recognition is not supported in this browser.
          </div>
          <p className="text-muted-foreground">
            Please try Chrome, Edge, or Safari for the best experience.
          </p>
          <textarea 
            className="w-full p-2 border rounded-md" 
            placeholder="Type your text here instead..."
            onChange={(e) => onTranscription(e.target.value)}
          />
        </div>
      );
    }
    
    return (
      <>
        {error && (
          <div className="text-amber-500 mb-2 text-center max-w-md bg-amber-50 p-2 rounded">
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
      </>
    );
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {renderContent()}
    </div>
  );
};

export default VoiceRecorder;
