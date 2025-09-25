import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mic, MicOff, Volume2, VolumeX, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceAssistantProps {
  selectedLanguage: string;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

interface Message {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const translations = {
  en: {
    assistant: "Voice Assistant",
    listening: "Listening...",
    speak: "Click to speak",
    mute: "Mute",
    unmute: "Unmute",
    startListening: "Start listening",
    stopListening: "Stop listening",
    noSpeechSupport: "Speech recognition not supported in this browser",
    hello: "Hello! I'm your FarmAI assistant. How can I help you today?",
    commands: {
      weather: "weather",
      crops: "crops",
      pesticides: "pesticides", 
      chemicals: "chemicals",
      analysis: "analysis",
      dashboard: "dashboard",
      help: "help"
    }
  },
  hi: {
    assistant: "आवाज सहायक",
    listening: "सुन रहा है...",
    speak: "बोलने के लिए क्लिक करें",
    mute: "बंद करें",
    unmute: "चालू करें",
    startListening: "सुनना शुरू करें",
    stopListening: "सुनना बंद करें",
    noSpeechSupport: "इस ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है",
    hello: "नमस्ते! मैं आपका FarmAI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    commands: {
      weather: "मौसम",
      crops: "फसल",
      pesticides: "कीटनाशक",
      chemicals: "रसायन",
      analysis: "विश्लेषण",
      dashboard: "डैशबोर्ड",
      help: "मदद"
    }
  }
};

export function VoiceAssistant({ selectedLanguage, onNavigate, currentPage }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    // Check for speech recognition support
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          handleVoiceCommand(transcript);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Add initial greeting
    if (messages.length === 0) {
      addMessage('assistant', t.hello);
      if (!isMuted) {
        speak(t.hello);
      }
    }
  }, []);

  const addMessage = (type: 'user' | 'assistant', text: string) => {
    setMessages(prev => [...prev, { type, text, timestamp: new Date() }]);
  };

  const speak = (text: string) => {
    if (synthRef.current && !isMuted) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    addMessage('user', command);
    
    let response = "";
    let navigationPage = "";

    // Process voice commands
    if (command.includes(t.commands.weather) || command.includes("weather")) {
      response = selectedLanguage === 'hi' 
        ? "मौसम भविष्यवाणी पृष्ठ खोल रहा हूं..." 
        : "Opening weather prediction page...";
      navigationPage = "weather";
    } else if (command.includes(t.commands.crops) || command.includes("crop")) {
      response = selectedLanguage === 'hi' 
        ? "फसल पुस्तकालय खोल रहा हूं..." 
        : "Opening crop library...";
      navigationPage = "crop-library";
    } else if (command.includes(t.commands.pesticides) || command.includes("pesticide")) {
      response = selectedLanguage === 'hi' 
        ? "कीटनाशक सिफारिश पृष्ठ खोल रहा हूं..." 
        : "Opening pesticide recommendations...";
      navigationPage = "pesticides";
    } else if (command.includes(t.commands.chemicals) || command.includes("chemical")) {
      response = selectedLanguage === 'hi' 
        ? "रासायनिक विश्लेषण पृष्ठ खोल रहा हूं..." 
        : "Opening chemical analysis...";
      navigationPage = "chemicals";
    } else if (command.includes(t.commands.analysis) || command.includes("image")) {
      response = selectedLanguage === 'hi' 
        ? "छवि विश्लेषण पृष्ठ खोल रहा हूं..." 
        : "Opening image analysis...";
      navigationPage = "image-analysis";
    } else if (command.includes(t.commands.dashboard) || command.includes("home")) {
      response = selectedLanguage === 'hi' 
        ? "डैशबोर्ड पर वापस जा रहा हूं..." 
        : "Going back to dashboard...";
      navigationPage = "dashboard";
    } else if (command.includes(t.commands.help) || command.includes("help")) {
      response = selectedLanguage === 'hi' 
        ? "आप कह सकते हैं: मौसम, फसल, कीटनाशक, रसायन, विश्लेषण, या डैशबोर्ड" 
        : "You can say: weather, crops, pesticides, chemicals, analysis, or dashboard";
    } else {
      response = selectedLanguage === 'hi' 
        ? "मुझे समझ नहीं आया। कृपया 'मदद' कहें उपलब्ध कमांड के लिए।" 
        : "I didn't understand. Please say 'help' for available commands.";
    }

    addMessage('assistant', response);
    speak(response);

    // Navigate if needed
    if (navigationPage && onNavigate) {
      setTimeout(() => {
        onNavigate(navigationPage);
      }, 2000);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <Card className="w-80 max-h-96 overflow-hidden shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    {t.assistant}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                  {messages.slice(-5).map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        message.type === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <Bot className="h-4 w-4 mt-1 text-blue-600" />
                      )}
                      <div
                        className={`p-2 rounded-lg max-w-xs text-sm ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-1 text-gray-600" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className="flex-1"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        {t.stopListening}
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        {t.startListening}
                      </>
                    )}
                  </Button>
                </div>
                
                {isListening && (
                  <div className="mt-2 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-sm text-blue-600"
                    >
                      {t.listening}
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {isListening && !isExpanded && (
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      )}
    </div>
  );
}

// Add global speech recognition types
declare global {
  interface Window {
    speechRecognition: any;
    webkitSpeechRecognition: any;
  }
}