
import React from 'react';
import VoiceTranslator from '@/components/VoiceTranslator';
import { Separator } from '@/components/ui/separator';
import { Headphones } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-voice-primary text-white p-4 md:p-6">
        <div className="max-w-3xl mx-auto w-full flex items-center gap-2">
          <Headphones className="h-6 w-6" />
          <h1 className="text-xl md:text-2xl font-bold">SpeakEasy Access</h1>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        <VoiceTranslator />
      </main>
      
      <footer className="mt-auto py-6">
        <div className="max-w-3xl mx-auto w-full px-4">
          <Separator className="mb-6" />
          <div className="text-center text-sm text-muted-foreground">
            <p>Voice Translation System for People with Disabilities</p>
            <p className="mt-1">&copy; {new Date().getFullYear()} SpeakEasy Access</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
