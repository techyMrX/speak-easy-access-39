
import { toast } from '@/components/ui/sonner';

// Mock translation service - in a real app, this would connect to a translation API
export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

// This is a mock translation service that simply returns dummy translations
// In a real app, you'd integrate with a translation API
export const translateText = async (
  request: TranslationRequest
): Promise<TranslationResponse> => {
  const { text, sourceLanguage, targetLanguage } = request;

  // Simulate API call with delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // If source and target languages are the same, just return the original text
  if (sourceLanguage === targetLanguage) {
    return {
      translatedText: text,
      sourceLanguage,
      targetLanguage,
    };
  }

  try {
    // Mock translation responses
    // In a real app, you would call an actual translation API here
    let translatedText = text;
    
    // Very basic mock translations for demo purposes
    if (sourceLanguage === 'en-US' && targetLanguage === 'es-ES') {
      // English to Spanish mock translations for common phrases
      if (text.toLowerCase().includes('hello')) {
        translatedText = text.replace(/hello/i, 'hola');
      } else if (text.toLowerCase().includes('thank you')) {
        translatedText = text.replace(/thank you/i, 'gracias');
      } else if (text.toLowerCase().includes('goodbye')) {
        translatedText = text.replace(/goodbye/i, 'adiós');
      } else if (text.toLowerCase().includes('help')) {
        translatedText = text.replace(/help/i, 'ayuda');
      } else {
        // For other text, just append mock Spanish text
        translatedText = `${text} (en Español)`;
      }
    } else if (sourceLanguage === 'es-ES' && targetLanguage === 'en-US') {
      // Spanish to English mock translations
      if (text.toLowerCase().includes('hola')) {
        translatedText = text.replace(/hola/i, 'hello');
      } else if (text.toLowerCase().includes('gracias')) {
        translatedText = text.replace(/gracias/i, 'thank you');
      } else if (text.toLowerCase().includes('adiós')) {
        translatedText = text.replace(/adiós/i, 'goodbye');
      } else if (text.toLowerCase().includes('ayuda')) {
        translatedText = text.replace(/ayuda/i, 'help');
      } else {
        // For other text, just append mock English text
        translatedText = `${text} (in English)`;
      }
    } else if (sourceLanguage === 'en-US' && targetLanguage === 'fr-FR') {
      // English to French mock translations
      if (text.toLowerCase().includes('hello')) {
        translatedText = text.replace(/hello/i, 'bonjour');
      } else if (text.toLowerCase().includes('thank you')) {
        translatedText = text.replace(/thank you/i, 'merci');
      } else {
        translatedText = `${text} (en Français)`;
      }
    }

    return {
      translatedText,
      sourceLanguage,
      targetLanguage,
    };
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Failed to translate text. Please try again later.');
    
    throw new Error('Translation failed');
  }
};

export const getLanguageName = (languageCode: string): string => {
  const languages: Record<string, string> = {
    'en-US': 'English',
    'es-ES': 'Spanish',
    'fr-FR': 'French',
    'de-DE': 'German',
    'zh-CN': 'Chinese',
    'ja-JP': 'Japanese',
    'ar-SA': 'Arabic',
    'ru-RU': 'Russian',
  };
  
  return languages[languageCode] || languageCode;
};

export const availableLanguages = [
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'zh-CN', name: 'Chinese' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'ru-RU', name: 'Russian' },
];
