import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Cloud, 
  Bug, 
  Beaker, 
  Camera, 
  Upload, 
  TrendingUp, 
  MapPin,
  User,
  LogOut,
  Wheat,
  Sprout
} from "lucide-react";
// import { motion } from 'motion/react';
import { motion } from 'framer-motion';

interface DashboardProps {
  user: { name: string; phone: string };
  selectedLanguage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const translations = {
  en: {
    welcome: "Welcome",
    dashboard: "FarmAI Dashboard",
    weather: "Weather Prediction",
    weatherDesc: "Get accurate weather forecasts for your region",
    pesticides: "Pesticide Recommendations",
    pesticidesDesc: "AI-powered pesticide suggestions for your crops",
    chemicals: "Chemical Analysis",
    chemicalsDesc: "Optimal chemical recommendations for better yield",
    imageAnalysis: "Crop Image Analysis",
    imageAnalysisDesc: "Upload or capture images for soil and crop analysis",
    cropLibrary: "Crop Library",
    cropLibraryDesc: "Explore different crops with detailed information",
    recentActivity: "Recent Activities",
    logout: "Logout"
  },
  hi: {
    welcome: "स्वागत है",
    dashboard: "FarmAI डैशबोर्ड",
    weather: "मौसम की भविष्यवाणी",
    weatherDesc: "अपने क्षेत्र के लिए सटीक मौसम पूर्वानुमान प्राप्त करें",
    pesticides: "कीटनाशक सुझाव",
    pesticidesDesc: "आपकी फसलों के लिए AI-संचालित कीटनाशक सुझाव",
    chemicals: "रासायनिक विश्लेषण",
    chemicalsDesc: "बेहतर उत्पादन के लिए इष्टतम रासायनिक सुझाव",
    imageAnalysis: "फसल छवि विश्लेषण",
    imageAnalysisDesc: "मिट्टी और फसल विश्लेषण के लिए छवियां अपलोड या कैप्चर करें",
    cropLibrary: "फसल पुस्तकालय",
    cropLibraryDesc: "विस्तृत जानकारी के साथ विभिन्न फसलों का अन्वेषण करें",
    recentActivity: "हाल की गतिविधियां",
    logout: "लॉगआउट"
  }
};

export function Dashboard({ user, selectedLanguage, onNavigate, onLogout }: DashboardProps) {
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const features = [
    {
      id: "weather",
      title: t.weather,
      description: t.weatherDesc,
      icon: Cloud,
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-50"
    },
    {
      id: "crop-library",
      title: t.cropLibrary,
      description: t.cropLibraryDesc,
      icon: Wheat,
      color: "bg-yellow-100 text-yellow-600",
      hoverColor: "hover:bg-yellow-50"
    },
    {
      id: "pesticides", 
      title: t.pesticides,
      description: t.pesticidesDesc,
      icon: Bug,
      color: "bg-red-100 text-red-600",
      hoverColor: "hover:bg-red-50"
    },
    {
      id: "chemicals",
      title: t.chemicals,
      description: t.chemicalsDesc,
      icon: Beaker,
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-50"
    },
    {
      id: "image-analysis",
      title: t.imageAnalysis,
      description: t.imageAnalysisDesc,
      icon: Camera,
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">FarmAI Insights</h1>
              <p className="text-muted-foreground">{t.dashboard}</p>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full">
                <User className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">{t.welcome}, {user.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t.logout}
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm group"
                  onClick={() => onNavigate(feature.id)}
                >
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <motion.div 
                      className={`p-4 rounded-xl ${feature.color} group-hover:scale-110 transition-transform duration-200`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                {t.recentActivity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Cloud className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedLanguage === 'hi' ? 'मौसम पूर्वानुमान का अनुरोध किया गया' : 'Weather forecast requested'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedLanguage === 'hi' ? '2 घंटे पहले' : '2 hours ago'}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Camera className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedLanguage === 'hi' ? 'फसल छवि का विश्लेषण किया गया' : 'Crop image analyzed'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedLanguage === 'hi' ? '1 दिन पहले' : '1 day ago'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Sprout className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedLanguage === 'hi' ? 'फसल पुस्तकालय देखा गया' : 'Crop library accessed'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedLanguage === 'hi' ? '3 दिन पहले' : '3 days ago'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}