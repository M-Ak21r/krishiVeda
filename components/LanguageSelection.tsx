import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Languages } from "lucide-react";

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'hi', name: 'हिंदी', english: 'Hindi' },
  { code: 'bn', name: 'বাংলা', english: 'Bengali' },
  { code: 'te', name: 'తెలుగు', english: 'Telugu' },
  { code: 'mr', name: 'मराठी', english: 'Marathi' },
  { code: 'ta', name: 'தமிழ்', english: 'Tamil' },
  { code: 'gu', name: 'ગુજરાતી', english: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', english: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', english: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  { code: 'or', name: 'ଓଡ଼ିଆ', english: 'Odia' },
  { code: 'as', name: 'অসমীয়া', english: 'Assamese' },
  { code: 'en', name: 'English', english: 'English' }
];

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Languages className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl text-green-800">FarmAI Insights</CardTitle>
          <CardDescription className="text-lg">
            Select your preferred language / अपनी भाषा चुनें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant="outline"
                className="h-16 flex flex-col items-center justify-center hover:bg-green-50 hover:border-green-300 transition-colors"
                onClick={() => onLanguageSelect(language.code)}
              >
                <span className="font-semibold text-lg">{language.name}</span>
                <span className="text-sm text-muted-foreground">{language.english}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}