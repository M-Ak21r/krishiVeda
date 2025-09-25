import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  Beaker, 
  Sprout,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  Droplets
} from "lucide-react";

interface ChemicalAnalysisProps {
  selectedLanguage: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Chemical Analysis & Fertilizer Recommendations",
    subtitle: "Get optimal chemical and fertilizer suggestions for better crop yield",
    cropType: "Crop Type",
    soilType: "Soil Type",
    growthStage: "Growth Stage",
    fieldSize: "Field Size (Acres)",
    selectCrop: "Select your crop",
    selectSoil: "Select soil type",
    selectStage: "Select growth stage",
    getAnalysis: "Get Chemical Analysis",
    recommendations: "Chemical Recommendations",
    npkLevels: "NPK Levels",
    micronutrients: "Micronutrients",
    applicationSchedule: "Application Schedule",
    costEstimate: "Cost Estimate",
    expectedYield: "Expected Yield Increase",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    back: "Back to Dashboard",
    loading: "Analyzing soil and crop requirements...",
    deficient: "Deficient",
    adequate: "Adequate",
    excessive: "Excessive",
    week: "Week",
    application: "Application",
    quantity: "Quantity per Acre"
  },
  hi: {
    title: "रासायनिक विश्लेषण और उर्वरक सुझाव",
    subtitle: "बेहतर फसल उत्पादन के लिए इष्टतम रासायनिक और उर्वरक सुझाव प्राप्त करें",
    cropType: "फसल का प्रकार",
    soilType: "मिट्टी का प्रकार",
    growthStage: "विकास अवस्था",
    fieldSize: "खेत का आकार (एकड़)",
    selectCrop: "अपनी फसल चुनें",
    selectSoil: "मिट्टी का प्रकार चुनें",
    selectStage: "विकास अवस्था चुनें",
    getAnalysis: "रासायनिक विश्लेषण प्राप्त करें",
    recommendations: "रासायनिक सुझाव",
    npkLevels: "NPK स्तर",
    micronutrients: "सूक्ष्म पोषक तत्व",
    applicationSchedule: "प्रयोग कार्यक्रम",
    costEstimate: "लागत अनुमान",
    expectedYield: "अपेक्षित उत्पादन वृद्धि",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फास्फोरस (P)",
    potassium: "पोटैशियम (K)",
    back: "डैशबोर्ड पर वापस जाएं",
    loading: "मिट्टी और फसल आवश्यकताओं का विश्लेषण हो रहा है...",
    deficient: "कमी",
    adequate: "पर्याप्त",
    excessive: "अधिक",
    week: "सप्ताह",
    application: "प्रयोग",
    quantity: "मात्रा प्रति एकड़"
  }
};

interface ChemicalRecommendation {
  nutrientLevels: {
    nitrogen: { level: number; status: 'deficient' | 'adequate' | 'excessive' };
    phosphorus: { level: number; status: 'deficient' | 'adequate' | 'excessive' };
    potassium: { level: number; status: 'deficient' | 'adequate' | 'excessive' };
  };
  micronutrients: Array<{
    name: string;
    status: 'deficient' | 'adequate' | 'excessive';
    recommendation: string;
  }>;
  applicationSchedule: Array<{
    week: number;
    fertilizer: string;
    quantity: string;
    method: string;
  }>;
  costEstimate: {
    total: number;
    breakdown: Array<{
      item: string;
      cost: number;
    }>;
  };
  expectedYieldIncrease: number;
}

const cropOptions = [
  { value: 'wheat', label: 'Wheat / गेहूं' },
  { value: 'rice', label: 'Rice / चावल' },
  { value: 'corn', label: 'Corn / मक्का' },
  { value: 'cotton', label: 'Cotton / कपास' },
  { value: 'sugarcane', label: 'Sugarcane / गन्ना' },
  { value: 'potato', label: 'Potato / आलू' },
  { value: 'tomato', label: 'Tomato / टमाटर' },
  { value: 'soybean', label: 'Soybean / सोयाबीन' }
];

const soilOptions = [
  { value: 'clay', label: 'Clay / चिकनी मिट्टी' },
  { value: 'sandy', label: 'Sandy / बलुई मिट्टी' },
  { value: 'loamy', label: 'Loamy / दोमट मिट्टी' },
  { value: 'silty', label: 'Silty / गाद मिट्टी' },
  { value: 'black', label: 'Black Cotton / काली कपास मिट्टी' },
  { value: 'red', label: 'Red / लाल मिट्टी' }
];

const stageOptions = [
  { value: 'sowing', label: 'Sowing / बुआई' },
  { value: 'germination', label: 'Germination / अंकुर���' },
  { value: 'vegetative', label: 'Vegetative / वानस्पतिक' },
  { value: 'flowering', label: 'Flowering / फूल आना' },
  { value: 'fruiting', label: 'Fruiting / फल लगना' },
  { value: 'maturation', label: 'Maturation / पकना' }
];

const mockRecommendation: ChemicalRecommendation = {
  nutrientLevels: {
    nitrogen: { level: 45, status: 'deficient' },
    phosphorus: { level: 78, status: 'adequate' },
    potassium: { level: 62, status: 'adequate' }
  },
  micronutrients: [
    { name: 'Iron (Fe)', status: 'deficient', recommendation: 'Apply iron sulfate 10 kg/acre' },
    { name: 'Zinc (Zn)', status: 'adequate', recommendation: 'Maintain current levels' },
    { name: 'Boron (B)', status: 'deficient', recommendation: 'Apply borax 2 kg/acre' },
    { name: 'Manganese (Mn)', status: 'adequate', recommendation: 'No additional application needed' }
  ],
  applicationSchedule: [
    { week: 1, fertilizer: 'DAP (18-46-0)', quantity: '50 kg/acre', method: 'Basal application' },
    { week: 3, fertilizer: 'Urea (46-0-0)', quantity: '25 kg/acre', method: 'Top dressing' },
    { week: 6, fertilizer: 'NPK (12-32-16)', quantity: '30 kg/acre', method: 'Side dressing' },
    { week: 9, fertilizer: 'Potash (0-0-60)', quantity: '20 kg/acre', method: 'Foliar spray' }
  ],
  costEstimate: {
    total: 4500,
    breakdown: [
      { item: 'DAP Fertilizer', cost: 1500 },
      { item: 'Urea', cost: 800 },
      { item: 'NPK Complex', cost: 1200 },
      { item: 'Potash', cost: 600 },
      { item: 'Micronutrients', cost: 400 }
    ]
  },
  expectedYieldIncrease: 25
};

export function ChemicalAnalysis({ selectedLanguage, onBack }: ChemicalAnalysisProps) {
  const [cropType, setCropType] = useState("");
  const [soilType, setSoilType] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [fieldSize, setFieldSize] = useState("");
  const [recommendation, setRecommendation] = useState<ChemicalRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const handleGetAnalysis = () => {
    if (!cropType || !soilType || !growthStage || !fieldSize) return;
    
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setRecommendation(mockRecommendation);
      setIsLoading(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deficient': return 'text-red-600 bg-red-50';
      case 'adequate': return 'text-green-600 bg-green-50';
      case 'excessive': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deficient': return AlertCircle;
      case 'adequate': return CheckCircle;
      case 'excessive': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-2xl text-purple-800">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Input Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              Crop & Soil Analysis Form
            </CardTitle>
            <CardDescription>Provide details about your crop and field for personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label>{t.cropType}</Label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectCrop} />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.soilType}</Label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectSoil} />
                  </SelectTrigger>
                  <SelectContent>
                    {soilOptions.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.growthStage}</Label>
                <Select value={growthStage} onValueChange={setGrowthStage}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectStage} />
                  </SelectTrigger>
                  <SelectContent>
                    {stageOptions.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.fieldSize}</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={fieldSize}
                  onChange={(e) => setFieldSize(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleGetAnalysis}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!cropType || !soilType || !growthStage || !fieldSize || isLoading}
            >
              <Beaker className="h-4 w-4 mr-2" />
              {t.getAnalysis}
            </Button>
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12 space-y-4 flex-col">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="text-muted-foreground">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {recommendation && !isLoading && (
          <div className="space-y-6">
            {/* NPK Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                  {t.npkLevels}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(recommendation.nutrientLevels).map(([nutrient, data]) => {
                    const StatusIcon = getStatusIcon(data.status);
                    return (
                      <div key={nutrient} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium capitalize">
                            {nutrient === 'nitrogen' ? t.nitrogen : 
                             nutrient === 'phosphorus' ? t.phosphorus : t.potassium}
                          </h3>
                          <Badge className={getStatusColor(data.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {data.status === 'deficient' ? t.deficient : 
                             data.status === 'adequate' ? t.adequate : t.excessive}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={data.level} className="h-2" />
                          <p className="text-sm text-muted-foreground text-center">{data.level}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Micronutrients */}
            <Card>
              <CardHeader>
                <CardTitle>{t.micronutrients}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.micronutrients.map((nutrient, index) => {
                    const StatusIcon = getStatusIcon(nutrient.status);
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <StatusIcon className={`h-5 w-5 mt-0.5 ${
                          nutrient.status === 'deficient' ? 'text-red-500' : 
                          nutrient.status === 'adequate' ? 'text-green-500' : 'text-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{nutrient.name}</h4>
                          <p className="text-sm text-muted-foreground">{nutrient.recommendation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Application Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t.applicationSchedule}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendation.applicationSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-purple-600">{schedule.week}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{t.week}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{schedule.fertilizer}</h4>
                        <p className="text-sm text-muted-foreground">
                          {t.quantity}: {schedule.quantity} • {schedule.method}
                        </p>
                      </div>
                      <Droplets className="h-5 w-5 text-blue-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost and Yield */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.costEstimate}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendation.costEstimate.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.item}</span>
                        <span className="font-medium">₹{item.cost}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-medium text-lg">
                      <span>Total</span>
                      <span>₹{recommendation.costEstimate.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t.expectedYield}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      +{recommendation.expectedYieldIncrease}%
                    </div>
                    <p className="text-muted-foreground">
                      Expected increase in crop yield with proper fertilizer application
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}