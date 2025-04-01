
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslationResultProps {
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
  className?: string;
}

const TranslationResult: React.FC<TranslationResultProps> = ({
  originalText,
  translatedText,
  fromLanguage,
  toLanguage,
  className
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!originalText) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {originalText && (
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{fromLanguage}</h3>
              <p className="text-lg">{originalText}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => speakText(originalText, fromLanguage === 'English' ? 'en-US' : 'es-ES')}
              disabled={isSpeaking}
              aria-label={`Listen to ${fromLanguage} text`}
            >
              <Volume2 className={cn("h-5 w-5", isSpeaking && "text-voice-primary")} />
            </Button>
          </div>
        </Card>
      )}

      {translatedText && (
        <Card className="p-4 border-voice-primary">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-voice-primary mb-1">{toLanguage}</h3>
              <p className="text-lg">{translatedText}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => speakText(translatedText, toLanguage === 'English' ? 'en-US' : 'es-ES')}
              disabled={isSpeaking}
              aria-label={`Listen to ${toLanguage} text`}
            >
              <Volume2 className={cn("h-5 w-5", isSpeaking && "text-voice-primary")} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TranslationResult;
