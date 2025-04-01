
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="mt-auto py-6">
      <div className="max-w-3xl mx-auto w-full px-4">
        <Separator className="mb-6" />
        <div className="text-center text-sm text-muted-foreground">
          <p>Voice Translation System for People with Disabilities</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} SpeakEasy Access</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
