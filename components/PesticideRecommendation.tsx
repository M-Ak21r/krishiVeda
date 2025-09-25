import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Bug, 
  Leaf,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Droplets,
  Sprout
} from "lucide-react";

interface PesticideRecommendationProps {
  selectedLanguage: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Pesticide Recommendations",
    subtitle: "Get AI-powered pesticide suggestions for your crops",
    cropType: "Crop Type",
    pestType: "Pest/Disease Type",
    severity: "Severity Level",
    selectCrop: "Select your crop",
    selectPest: "Select pest or disease",
    selectSeverity: "Select severity",
    getRecommendations: "Get Recommendations",
    recommendations: "Recommended Pesticides",
    organic: "Organic",
    chemical: "Chemical",
    dosage: "Dosage",
    application: "Application Method",
    timing: "Best Timing",
    precautions: "Precautions",
    effectiveness: "Effectiveness",
    cost: "Cost Level",
    back: "Back to Dashboard",
    loading: "Analyzing pest problem..."
  },
  hi: {
    title: "कीटनाशक सुझाव",
    subtitle: "अपनी फसलों के लिए AI-संचालित कीटनाशक सुझाव प्राप्त करें",
    cropType: "फसल का प्रकार",
    pestType: "कीट/रोग का प्रकार",
    severity: "गंभीरता का स्तर",
    selectCrop: "अपनी फसल चुनें",
    selectPest: "कीट या रोग चुनें",
    selectSeverity: "गंभीरता चुनें",
    getRecommendations: "सुझाव प्राप्त करें",
    recommendations: "सुझाए गए कीटनाशक",
    organic: "जैविक",
    chemical: "रासायनिक",
    dosage: "खुराक",
    application: "प्रयोग विधि",
    timing: "सबसे अच्छा समय",
    precautions: "सावधानियां",
    effectiveness: "प्रभावशीलता",
    cost: "लागत स्तर",
    back: "डैशबोर्ड पर वापस जाएं",
    loading: "कीट समस्या का विश्लेषण हो रहा है..."
  }
};

interface PesticideRecommendation {
  name: string;
  type: 'organic' | 'chemical';
  effectiveness: number;
  cost: 'low' | 'medium' | 'high';
  dosage: string;
  applicationMethod: string;
  timing: string;
  precautions: string[];
  activeIngredient: string;
}

const cropOptions = [
  { value: 'wheat', label: 'Wheat / गेहूं' },
  { value: 'rice', label: 'Rice / चावल' },
  { value: 'corn', label: 'Corn / मक्का' },
  { value: 'cotton', label: 'Cotton / कपास' },
  { value: 'sugarcane', label: 'Sugarcane / गन्ना' },
  { value: 'potato', label: 'Potato / आलू' },
  { value: 'tomato', label: 'Tomato / टमाटर' },
  { value: 'onion', label: 'Onion / प्याज' }
];

const pestOptions = [
  { value: 'aphids', label: 'Aphids / माहू' },
  { value: 'caterpillars', label: 'Caterpillars / इल्ली' },
  { value: 'whitefly', label: 'Whitefly / सफेद मक्खी' },
  { value: 'thrips', label: 'Thrips / थ्रिप्स' },
  { value: 'fungal-disease', label: 'Fungal Disease / फंगल रोग' },
  { value: 'bacterial-blight', label: 'Bacterial Blight / जीवाणु अंगमारी' },
  { value: 'rust', label: 'Rust / रतुआ' },
  { value: 'stem-borer', label: 'Stem Borer / तना छेदक' }
];

const severityOptions = [
  { value: 'low', label: 'Low (0-25% damage) / कम' },
  { value: 'medium', label: 'Medium (25-50% damage) / मध्यम' },
  { value: 'high', label: 'High (50-75% damage) / अधिक' },
  { value: 'severe', label: 'Severe (75%+ damage) / गंभीर' }
];

const mockRecommendations: PesticideRecommendation[] = [
  {
    name: "Neem Oil",
    type: "organic",
    effectiveness: 85,
    cost: "low",
    dosage: "2-3 ml per liter of water",
    applicationMethod: "Foliar spray",
    timing: "Early morning or evening",
    precautions: ["Avoid spraying during flowering", "Test on small area first"],
    activeIngredient: "Azadirachtin"
  },
  {
    name: "Bacillus thuringiensis (Bt)",
    type: "organic",
    effectiveness: 90,
    cost: "medium",
    dosage: "1-2 grams per liter",
    applicationMethod: "Foliar spray",
    timing: "When larvae are young",
    precautions: ["Store in cool, dry place", "Use within 2 years"],
    activeIngredient: "Bt protein crystals"
  },
  {
    name: "Imidacloprid",
    type: "chemical",
    effectiveness: 95,
    cost: "medium",
    dosage: "0.3-0.5 ml per liter",
    applicationMethod: "Soil application or spray",
    timing: "Before pest infestation",
    precautions: ["Wear protective gear", "Keep away from water sources", "Follow PHI period"],
    activeIngredient: "Imidacloprid 17.8% SL"
  }
];

export function PesticideRecommendation({ selectedLanguage, onBack }: PesticideRecommendationProps) {
  const [cropType, setCropType] = useState("");
  const [pestType, setPestType] = useState("");
  const [severity, setSeverity] = useState("");
  const [recommendations, setRecommendations] = useState<PesticideRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const handleGetRecommendations = () => {
    if (!cropType || !pestType || !severity) return;
    
    setIsLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'organic' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-2xl text-red-800">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Input Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Pest Analysis Form
            </CardTitle>
            <CardDescription>Select your crop and pest details to get targeted recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                <Label>{t.pestType}</Label>
                <Select value={pestType} onValueChange={setPestType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectPest} />
                  </SelectTrigger>
                  <SelectContent>
                    {pestOptions.map((pest) => (
                      <SelectItem key={pest.value} value={pest.value}>
                        {pest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t.severity}</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectSeverity} />
                  </SelectTrigger>
                  <SelectContent>
                    {severityOptions.map((sev) => (
                      <SelectItem key={sev.value} value={sev.value}>
                        {sev.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleGetRecommendations}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={!cropType || !pestType || !severity || isLoading}
            >
              <Bug className="h-4 w-4 mr-2" />
              {t.getRecommendations}
            </Button>
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12 space-y-4 flex-col">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                <p className="text-muted-foreground">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {recommendations.length > 0 && !isLoading && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  {t.recommendations}
                </CardTitle>
                <CardDescription>
                  Based on your selection: {cropOptions.find(c => c.value === cropType)?.label} - {pestOptions.find(p => p.value === pestType)?.label}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {recommendations.map((pesticide, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{pesticide.name}</CardTitle>
                        <CardDescription className="mt-1">
                          Active Ingredient: {pesticide.activeIngredient}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(pesticide.type)}>
                          {pesticide.type === 'organic' ? t.organic : t.chemical}
                        </Badge>
                        <Badge className={getCostColor(pesticide.cost)}>
                          {pesticide.cost} {t.cost}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Effectiveness */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{t.effectiveness}:</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${pesticide.effectiveness}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{pesticide.effectiveness}%</span>
                    </div>

                    <Separator />

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium">{t.dosage}</p>
                            <p className="text-sm text-muted-foreground">{pesticide.dosage}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Sprout className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">{t.application}</p>
                            <p className="text-sm text-muted-foreground">{pesticide.applicationMethod}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-purple-500 mt-0.5" />
                          <div>
                            <p className="font-medium">{t.timing}</p>
                            <p className="text-sm text-muted-foreground">{pesticide.timing}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Precautions */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <p className="font-medium">{t.precautions}</p>
                      </div>
                      <ul className="space-y-1">
                        {pesticide.precautions.map((precaution, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">•</span>
                            {precaution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}