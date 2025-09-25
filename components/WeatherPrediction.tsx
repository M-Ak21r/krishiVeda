import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Cloud, 
  Sun, 
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  MapPin,
  Calendar,
  Leaf,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Sprout,
  Shield
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

interface WeatherPredictionProps {
  selectedLanguage: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Weather Prediction",
    subtitle: "Get accurate weather forecasts for your farming area",
    state: "State",
    city: "City", 
    selectState: "Select state",
    selectCity: "Select city",
    getWeather: "Get Weather Forecast",
    currentWeather: "Current Weather",
    forecast: "7-Day Forecast",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    visibility: "Visibility",
    rainfall: "Rainfall",
    back: "Back to Dashboard",
    farmingTips: "Farming Tips",
    loading: "Loading weather data...",
    cropConditions: "Crop Growth Conditions",
    optimal: "Optimal",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    riskAssessment: "Risk Assessment",
    lowRisk: "Low Risk",
    mediumRisk: "Medium Risk",
    highRisk: "High Risk",
    cropRecommendations: "Crop Recommendations",
    bestCrops: "Best Crops for Current Weather",
    upcomingWeatherAlerts: "Weather Alerts",
    irrigationAdvice: "Irrigation Advice",
    pestRisk: "Pest Risk Assessment"
  },
  hi: {
    title: "मौसम की भविष्यवाणी",
    subtitle: "अपने खेती क्षेत्र के लिए सटीक मौसम पूर्वानुमान प्राप्त करें",
    state: "राज्य",
    city: "शहर",
    selectState: "राज्य चुनें",
    selectCity: "शहर चुनें",
    getWeather: "मौसम पूर्वानुमान प्राप्त करें",
    currentWeather: "वर्तमान मौसम",
    forecast: "7-दिन का पूर्वानुमान",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    visibility: "दृश्यता",
    rainfall: "वर्षा",
    back: "डैशबोर्ड पर वापस जाएं",
    farmingTips: "खेती की सुझाव",
    loading: "मौसम डेटा लोड हो रहा है...",
    cropConditions: "फसल वृद्धि की स्थिति",
    optimal: "इष्टतम",
    good: "अच्छा",
    moderate: "मध्यम",
    poor: "खराब",
    riskAssessment: "जोखिम मूल्यांकन",
    lowRisk: "कम जोखिम",
    mediumRisk: "मध्यम जोखिम",
    highRisk: "उच्च जोखिम",
    cropRecommendations: "फसल सिफारिशें",
    bestCrops: "वर्तमान मौसम के लिए सर्वोत्तम फसलें",
    upcomingWeatherAlerts: "मौसम चेतावनी",
    irrigationAdvice: "सिंचाई सलाह",
    pestRisk: "कीट जोखिम मूल्यांकन"
  }
};

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    rainfall: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    rainfall: number;
  }>;
  farmingTips: string[];
  cropConditions: {
    wheat: { status: string; score: number; advice: string; };
    rice: { status: string; score: number; advice: string; };
    cotton: { status: string; score: number; advice: string; };
    sugarcane: { status: string; score: number; advice: string; };
  };
  weatherAlerts: Array<{
    type: string;
    severity: string;
    message: string;
    icon: string;
  }>;
  irrigationAdvice: {
    recommendation: string;
    waterNeeded: string;
    timing: string;
  };
  pestRisk: {
    level: string;
    crops: string[];
    prevention: string;
  };
}

const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    rainfall: 2.5,
    icon: "partly-cloudy"
  },
  forecast: [
    { date: "2025-09-13", day: "Tomorrow", high: 30, low: 22, condition: "Sunny", icon: "sunny", rainfall: 0 },
    { date: "2025-09-14", day: "Sunday", high: 32, low: 24, condition: "Partly Cloudy", icon: "partly-cloudy", rainfall: 0 },
    { date: "2025-09-15", day: "Monday", high: 29, low: 21, condition: "Rainy", icon: "rainy", rainfall: 15 },
    { date: "2025-09-16", day: "Tuesday", high: 26, low: 19, condition: "Cloudy", icon: "cloudy", rainfall: 5 },
    { date: "2025-09-17", day: "Wednesday", high: 28, low: 20, condition: "Sunny", icon: "sunny", rainfall: 0 },
    { date: "2025-09-18", day: "Thursday", high: 31, low: 23, condition: "Partly Cloudy", icon: "partly-cloudy", rainfall: 0 },
    { date: "2025-09-19", day: "Friday", high: 33, low: 25, condition: "Hot", icon: "sunny", rainfall: 0 }
  ],
  farmingTips: [
    "Good conditions for wheat sowing in the next 3 days",
    "Light rain expected on Monday - ideal for recently planted crops",
    "High temperatures later in the week - ensure adequate irrigation",
    "Low humidity levels - monitor for pest activity"
  ],
  cropConditions: {
    wheat: { status: "Optimal", score: 85, advice: "Perfect temperature and humidity for germination. Sow seeds now." },
    rice: { status: "Good", score: 75, advice: "Adequate moisture levels. Monitor water levels in fields." },
    cotton: { status: "Moderate", score: 60, advice: "Temperature suitable but humidity could be higher. Consider irrigation." },
    sugarcane: { status: "Good", score: 78, advice: "Good growing conditions. Ensure regular watering." }
  },
  weatherAlerts: [
    { type: "Heat Wave", severity: "Medium", message: "High temperatures expected Friday-Saturday. Increase irrigation frequency.", icon: "sun" },
    { type: "Rain", severity: "Low", message: "Light to moderate rain expected Monday. Good for crop growth.", icon: "rain" }
  ],
  irrigationAdvice: {
    recommendation: "Moderate irrigation required",
    waterNeeded: "15-20mm per day",
    timing: "Early morning (6-8 AM) and evening (6-8 PM)"
  },
  pestRisk: {
    level: "Medium",
    crops: ["Cotton", "Wheat"],
    prevention: "Monitor crop regularly. Apply organic neem-based pesticides if needed."
  }
};

const temperatureData = mockWeatherData.forecast.map(day => ({
  day: day.day,
  high: day.high,
  low: day.low
}));

const indianStates = [
  { value: "andhra-pradesh", label: "Andhra Pradesh / आंध्र प्रदेश" },
  { value: "bihar", label: "Bihar / बिहार" },
  { value: "gujarat", label: "Gujarat / गुजरात" },
  { value: "haryana", label: "Haryana / हरियाणा" },
  { value: "karnataka", label: "Karnataka / कर्नाटक" },
  { value: "madhya-pradesh", label: "Madhya Pradesh / मध्य प्रदेश" },
  { value: "maharashtra", label: "Maharashtra / महाराष्ट्र" },
  { value: "punjab", label: "Punjab / पंजाब" },
  { value: "rajasthan", label: "Rajasthan / राजस्थान" },
  { value: "tamil-nadu", label: "Tamil Nadu / तमिल नाडु" },
  { value: "uttar-pradesh", label: "Uttar Pradesh / उत्तर प्रदेश" },
  { value: "west-bengal", label: "West Bengal / पश्चिम बंगाल" }
];

const citiesByState = {
  "maharashtra": [
    { value: "mumbai", label: "Mumbai / मुंबई" },
    { value: "pune", label: "Pune / पुणे" },
    { value: "nagpur", label: "Nagpur / नागपुर" },
    { value: "nashik", label: "Nashik / नाशिक" }
  ],
  "uttar-pradesh": [
    { value: "lucknow", label: "Lucknow / लखनऊ" },
    { value: "kanpur", label: "Kanpur / कानपुर" },
    { value: "agra", label: "Agra / आगरा" },
    { value: "varanasi", label: "Varanasi / वाराणसी" }
  ],
  "gujarat": [
    { value: "ahmedabad", label: "Ahmedabad / अहमदाबाद" },
    { value: "surat", label: "Surat / सूरत" },
    { value: "vadodara", label: "Vadodara / वडोदरा" },
    { value: "rajkot", label: "Rajkot / राजकोट" }
  ],
  "punjab": [
    { value: "chandigarh", label: "Chandigarh / चंडीगढ़" },
    { value: "ludhiana", label: "Ludhiana / लुधियाना" },
    { value: "amritsar", label: "Amritsar / अमृतसर" },
    { value: "jalandhar", label: "Jalandhar / जालंधर" }
  ]
};

export function WeatherPrediction({ selectedLanguage, onBack }: WeatherPredictionProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return Sun;
      case 'cloudy':
        return Cloud;
      case 'partly-cloudy':
        return Cloud;
      case 'rainy':
        return CloudRain;
      default:
        return Sun;
    }
  };

  const getConditionColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getConditionIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal': return CheckCircle;
      case 'good': return TrendingUp;
      case 'moderate': return AlertTriangle;
      case 'poor': return TrendingDown;
      default: return AlertTriangle;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleGetWeather = () => {
    if (!selectedState || !selectedCity) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setIsLoading(false);
    }, 2000);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(""); // Reset city when state changes
  };

  const availableCities = selectedState ? citiesByState[selectedState as keyof typeof citiesByState] || [] : [];

  const getLocationName = () => {
    if (!selectedState || !selectedCity) return "";
    const stateName = indianStates.find(s => s.value === selectedState)?.label.split('/')[0].trim();
    const cityName = availableCities.find(c => c.value === selectedCity)?.label.split('/')[0].trim();
    return `${cityName}, ${stateName}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* Location Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>{t.state}</Label>
                  <Select value={selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder={t.selectState} />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.city}</Label>
                  <Select 
                    value={selectedCity} 
                    onValueChange={setSelectedCity}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder={t.selectCity} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="self-end">
                  <Button 
                    onClick={handleGetWeather}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
                    disabled={!selectedState || !selectedCity || isLoading}
                  >
                    <Cloud className="h-4 w-4 mr-2" />
                    {t.getWeather}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12 space-y-4 flex-col">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-muted-foreground">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {weatherData && !isLoading && (
          <div className="space-y-6">
            {/* Weather Alerts */}
            {weatherData.weatherAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      {t.upcomingWeatherAlerts}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weatherData.weatherAlerts.map((alert, index) => (
                        <div key={index} className={`p-4 rounded-lg border-l-4 ${
                          alert.severity === 'High' ? 'bg-red-50 border-red-500' :
                          alert.severity === 'Medium' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={getRiskColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <span className="font-medium">{alert.type}</span>
                          </div>
                          <p className="text-sm mt-2">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    {t.currentWeather}
                  </CardTitle>
                  <CardDescription>Current conditions in {getLocationName()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex justify-center mb-2">
                        {React.createElement(getWeatherIcon(weatherData.current.icon), { 
                          className: "h-8 w-8 text-yellow-500" 
                        })}
                      </div>
                      <p className="text-2xl font-bold text-blue-800">{weatherData.current.temperature}°C</p>
                      <p className="text-sm text-muted-foreground">{weatherData.current.condition}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-lg font-semibold text-blue-800">{weatherData.current.humidity}%</p>
                      <p className="text-sm text-muted-foreground">{t.humidity}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <Wind className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <p className="text-lg font-semibold text-green-800">{weatherData.current.windSpeed} km/h</p>
                      <p className="text-sm text-muted-foreground">{t.windSpeed}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                      <p className="text-lg font-semibold text-purple-800">{weatherData.current.visibility} km</p>
                      <p className="text-sm text-muted-foreground">{t.visibility}</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                      <CloudRain className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                      <p className="text-lg font-semibold text-indigo-800">{weatherData.current.rainfall} mm</p>
                      <p className="text-sm text-muted-foreground">{t.rainfall}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Crop Growth Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    {t.cropConditions}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(weatherData.cropConditions).map(([crop, condition]) => {
                      const IconComponent = getConditionIcon(condition.status);
                      return (
                        <div key={crop} className={`p-4 rounded-xl border ${getConditionColor(condition.status)}`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold capitalize">{crop}</h4>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={getConditionColor(condition.status)}>
                              {condition.status}
                            </Badge>
                            <span className="text-sm font-medium">{condition.score}%</span>
                          </div>
                          <p className="text-sm">{condition.advice}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risk Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Irrigation Advice */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-500" />
                      {t.irrigationAdvice}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800">Recommendation</h4>
                        <p className="text-sm text-blue-600">{weatherData.irrigationAdvice.recommendation}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800">Water Needed</h4>
                        <p className="text-sm text-green-600">{weatherData.irrigationAdvice.waterNeeded}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800">Best Timing</h4>
                        <p className="text-sm text-purple-600">{weatherData.irrigationAdvice.timing}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pest Risk */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-orange-500" />
                      {t.pestRisk}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(weatherData.pestRisk.level)}>
                          {weatherData.pestRisk.level} Risk
                        </Badge>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-orange-800">Affected Crops</h4>
                        <p className="text-sm text-orange-600">{weatherData.pestRisk.crops.join(', ')}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-800">Prevention</h4>
                        <p className="text-sm text-yellow-600">{weatherData.pestRisk.prevention}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Temperature Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    {t.temperature} Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="day" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="high" 
                          stroke="#ef4444" 
                          strokeWidth={3} 
                          name="High"
                          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="low" 
                          stroke="#3b82f6" 
                          strokeWidth={3} 
                          name="Low"
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 7-Day Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    {t.forecast}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                    {weatherData.forecast.map((day, index) => {
                      const IconComponent = getWeatherIcon(day.icon);
                      return (
                        <motion.div 
                          key={index} 
                          className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow"
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="font-medium mb-2 text-gray-800">{day.day}</p>
                          <IconComponent className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                          <p className="text-sm font-medium text-gray-800">{day.high}°/{day.low}°</p>
                          <p className="text-xs text-muted-foreground mb-1">{day.condition}</p>
                          {day.rainfall > 0 && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {day.rainfall}mm
                            </Badge>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Farming Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    {t.farmingTips}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weatherData.farmingTips.map((tip, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-l-4 border-green-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="p-1 bg-green-100 rounded-full mt-1">
                          <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-700">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}