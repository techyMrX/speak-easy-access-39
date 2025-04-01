
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Language {
  code: string;
  name: string;
}

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (languageCode: string) => void;
  onTargetLanguageChange: (languageCode: string) => void;
  availableLanguages: Language[];
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
  availableLanguages,
  className
}) => {
  // Swap languages function
  const swapLanguages = () => {
    const tempLang = sourceLanguage;
    onSourceLanguageChange(targetLanguage);
    onTargetLanguageChange(tempLang);
  };

  return (
    <div className={cn("flex items-center gap-2 lg:gap-4", className)}>
      <Select value={sourceLanguage} onValueChange={onSourceLanguageChange}>
        <SelectTrigger className="min-w-[140px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Source Language</SelectLabel>
            {availableLanguages.map((lang) => (
              <SelectItem key={`source-${lang.code}`} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <button 
        onClick={swapLanguages}
        className="p-2 rounded-full bg-voice-light hover:bg-voice-secondary hover:text-white transition-colors"
        aria-label="Swap languages"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
        <SelectTrigger className="min-w-[140px]">
          <SelectValue placeholder="Target" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Target Language</SelectLabel>
            {availableLanguages.map((lang) => (
              <SelectItem key={`target-${lang.code}`} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
