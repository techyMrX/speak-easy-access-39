
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceRecorder from './VoiceRecorder';
import TranslationResult from './TranslationResult';
import LanguageSelector from './LanguageSelector';
import { translateText, availableLanguages, getLanguageName } from '@/services/translationService';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const VoiceTranslator: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('es-ES');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranscription = async (text: string) => {
    setInputText(text);
    await performTranslation(text);
  };

  const handleManualTranslate = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate');
      return;
    }
    await performTranslation(inputText.trim());
  };

  const performTranslation = async (text: string) => {
    try {
      setIsTranslating(true);
      const response = await translateText({
        text,
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(response.translatedText);
    } catch (error) {
      console.error('Translation failed:', error);
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSourceLanguageChange = (langCode: string) => {
    setSourceLanguage(langCode);
    if (inputText) {
      performTranslation(inputText);
    }
  };

  const handleTargetLanguageChange = (langCode: string) => {
    setTargetLanguage(langCode);
    if (inputText) {
      performTranslation(inputText);
    }
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-voice-primary">Voice Translator</h2>
            
            <LanguageSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceLanguageChange={handleSourceLanguageChange}
              onTargetLanguageChange={handleTargetLanguageChange}
              availableLanguages={availableLanguages}
            />
          </div>
          
          <VoiceRecorder
            onTranscription={handleTranscription}
            isListening={isListening}
            onListeningChange={setIsListening}
            className="py-8"
          />

          <div className="relative">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or speak to translate..."
              className="min-h-[100px] text-lg"
              disabled={isListening}
            />
            
            <div className="absolute bottom-3 right-3 flex gap-2">
              {inputText && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAll}
                  className="text-sm text-muted-foreground"
                >
                  Clear
                </Button>
              )}
              <Button
                onClick={handleManualTranslate}
                disabled={!inputText.trim() || isTranslating || isListening}
                className="bg-voice-primary hover:bg-voice-secondary"
              >
                <Send className="h-4 w-4 mr-1" />
                Translate
              </Button>
            </div>
          </div>

          <TranslationResult
            originalText={inputText}
            translatedText={translatedText}
            fromLanguage={getLanguageName(sourceLanguage)}
            toLanguage={getLanguageName(targetLanguage)}
            className="mt-6"
          />
        </CardContent>
      </Card>
      
      <p className="text-center text-sm text-muted-foreground">
        This translator uses browser Speech Recognition and Text-to-Speech capabilities.
        <br />
        Please allow microphone access when prompted.
      </p>
    </div>
  );
};

export default VoiceTranslator;
