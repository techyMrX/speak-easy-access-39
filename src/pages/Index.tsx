
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Headphones, ArrowRight, Volume2, Globe, MessagesSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-voice-primary text-white p-4 md:p-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            <span className="text-xl md:text-2xl font-bold">SpeakEasy Access</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-voice-primary hover:bg-white/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="bg-voice-primary text-white py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Real-time Voice Translation for Everyone
                </h1>
                <p className="text-lg opacity-90">
                  Breaking down language barriers for people with disabilities through
                  instant voice translation technology.
                </p>
                <div className="pt-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white text-voice-primary hover:bg-white/90">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <img
                  src="/lovable-uploads/a96de3d5-9316-44c9-9e16-9b117bd74e7d.png"
                  alt="SpeakEasy Access Interface"
                  className="rounded-lg shadow-xl max-w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-background">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-voice-primary">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Volume2 className="h-12 w-12 text-voice-primary mb-4" />
                  <CardTitle className="mb-2">Speak</CardTitle>
                  <CardDescription>
                    Simply tap the microphone button and speak in your language.
                    Our advanced speech recognition captures your words accurately.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Globe className="h-12 w-12 text-voice-primary mb-4" />
                  <CardTitle className="mb-2">Translate</CardTitle>
                  <CardDescription>
                    Our system instantly translates your speech into the selected 
                    target language with high accuracy and natural phrasing.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <MessagesSquare className="h-12 w-12 text-voice-primary mb-4" />
                  <CardTitle className="mb-2">Communicate</CardTitle>
                  <CardDescription>
                    Read the translated text or have it spoken out loud, 
                    breaking down language barriers in real-time.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Headphones className="h-5 w-5 text-voice-primary" />
            <span className="text-lg font-bold text-voice-primary">SpeakEasy Access</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Voice Translation System for People with Disabilities
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            &copy; {new Date().getFullYear()} SpeakEasy Access
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
