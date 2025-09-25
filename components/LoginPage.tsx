import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Leaf, Phone, Mail, User, Lock, ArrowRight, Sparkles } from "lucide-react";

interface LoginPageProps {
  onLogin: (userData: { name: string; phone: string }) => void;
  selectedLanguage: string;
}

const translations = {
  en: {
    title: "FarmAI Insights",
    subtitle: "Intelligent Farming Solutions for Modern Agriculture",
    welcome: "Welcome Back",
    newUser: "New to FarmAI?",
    loginTab: "Sign In",
    signupTab: "Sign Up",
    name: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginButton: "Sign In",
    signupButton: "Create Account",
    phonePlaceholder: "+91 XXXXX XXXXX",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "farmer@example.com",
    features: {
      weather: "Real-time Weather Analytics",
      ai: "AI-Powered Crop Insights", 
      expert: "Expert Recommendations"
    },
    tagline: "Empowering farmers with AI-driven insights for better crop yields"
  },
  hi: {
    title: "FarmAI Insights",
    subtitle: "आधुनिक कृषि के लिए बुद्धिमान खेती समाधान",
    welcome: "आपका स्वागत है",
    newUser: "FarmAI में नए हैं?",
    loginTab: "साइन इन",
    signupTab: "साइन अप",
    name: "पूरा नाम",
    phone: "फोन नंबर",
    email: "ईमेल पता",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    loginButton: "साइन इन करें",
    signupButton: "खाता बनाएं",
    phonePlaceholder: "+91 XXXXX XXXXX",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    emailPlaceholder: "farmer@example.com",
    features: {
      weather: "रियल-टाइम मौसम विश्लेषण",
      ai: "AI-संचालित फसल अंतर्दृष्टि",
      expert: "विशेषज्ञ सुझाव"
    },
    tagline: "बेहतर फसल उत्पादन के लिए AI-संचालित अंतर्दृष्टि के साथ किसानों को सशक्त बनाना"
  }
};

export function LoginPage({ onLogin, selectedLanguage }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    phone: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: "Farmer User", phone: loginData.phone });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: signupData.name, phone: signupData.phone });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex">
        {/* Left side - Branding and Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 py-8">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                <div className="flex items-center gap-1 mt-1">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Powered by AI</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.subtitle}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{t.tagline}</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.5 5.5 0 11-9.78 2.096A4.4 4.4 0 003 15z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{t.features.weather}</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{t.features.ai}</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{t.features.expert}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center px-6 py-8">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="lg:hidden flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-gray-800 lg:hidden">{t.title}</CardTitle>
              <CardTitle className="text-xl text-gray-800 hidden lg:block">{t.welcome}</CardTitle>
              <CardDescription className="text-gray-600 lg:hidden">{t.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    {t.loginTab}
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    {t.signupTab}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-phone">{t.phone}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-phone"
                          type="tel"
                          placeholder={t.phonePlaceholder}
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={loginData.phone}
                          onChange={(e) => setLoginData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t.password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                      {t.loginButton}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">{t.name}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder={t.namePlaceholder}
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={signupData.name}
                          onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">{t.phone}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-phone"
                          type="tel"
                          placeholder={t.phonePlaceholder}
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={signupData.phone}
                          onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t.email}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder={t.emailPlaceholder}
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={signupData.email}
                          onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t.password}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          className="pl-10 h-12 bg-white/70 border-gray-200 focus:border-green-500 focus:ring-green-500"
                          value={signupData.password}
                          onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                      {t.signupButton}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}