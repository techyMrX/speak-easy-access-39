
import React from 'react';
import { cn } from "@/lib/utils";

interface AudioWaveformProps {
  isActive: boolean;
  className?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isActive, className }) => {
  return (
    <div className={cn("flex items-end justify-center h-12 gap-1", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            "w-2 bg-voice-primary rounded-full transition-all duration-300 ease-in-out",
            isActive ? `animate-wave-${i} h-full` : "h-2"
          )}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
