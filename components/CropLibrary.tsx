import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Search,
  Wheat,
  Droplets,
  Calendar,
  Thermometer,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CropLibraryProps {
  selectedLanguage: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Crop Library",
    subtitle: "Explore different crops with detailed information and cultivation tips",
    searchPlaceholder: "Search crops...",
    allCrops: "All Crops",
    cereals: "Cereals",
    vegetables: "Vegetables",
    fruits: "Fruits",
    pulses: "Pulses",
    spices: "Spices",
    growingSeason: "Growing Season",
    waterRequirement: "Water Requirement",
    soilType: "Soil Type",
    marketPrice: "Market Price",
    yieldPotential: "Yield Potential",
    growthDuration: "Growth Duration",
    climateRequirement: "Climate Requirement",
    back: "Back to Dashboard",
    viewDetails: "View Details",
    perAcre: "per acre",
    days: "days",
    loading: "Loading crop information..."
  },
  hi: {
    title: "फसल पुस्तकालय",
    subtitle: "विस्तृत जानकारी और खेती की युक्तियों के साथ विभिन्न फसलों का अन्वेषण करें",
    searchPlaceholder: "फसल खोजें...",
    allCrops: "सभी फसलें",
    cereals: "अनाज",
    vegetables: "सब्जियां",
    fruits: "फल",
    pulses: "दालें",
    spices: "मसाले",
    growingSeason: "बुआई का मौसम",
    waterRequirement: "पानी की आवश्यकता",
    soilType: "मिट्टी का प्रकार",
    marketPrice: "बाजार भाव",
    yieldPotential: "उत्पादन क्षमता",
    growthDuration: "विकास अवधि",
    climateRequirement: "जलवायु आवश्यकता",
    back: "डैशबोर्ड पर वापस जाएं",
    viewDetails: "विवरण देखें",
    perAcre: "प्रति एकड़",
    days: "दिन",
    loading: "फसल की जानकारी लोड हो रही है..."
  }
};

interface Crop {
  id: string;
  name: { en: string; hi: string };
  category: string;
  image: string;
  season: string;
  waterRequirement: string;
  soilType: string;
  marketPrice: string;
  yieldPotential: string;
  growthDuration: number;
  climate: string;
  description: { en: string; hi: string };
}

const cropCategories = [
  "all",
  "cereals", 
  "vegetables",
  "fruits",
  "pulses",
  "spices"
];

export function CropLibrary({ selectedLanguage, onBack }: CropLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [crops, setCrops] = useState<Crop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    setIsLoading(true);
    
    // Mock crop data with realistic information
    const mockCrops: Crop[] = [
      {
        id: "wheat",
        name: { en: "Wheat", hi: "गेहूं" },
        category: "cereals",
        image: "https://images.unsplash.com/photo-1715289718087-66a61b7b4c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGNyb3AlMjBmYXJtaW5nJTIwZmllbGR8ZW58MXx8fHwxNzU3Njk2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Rabi (Nov-Mar)",
        waterRequirement: "Medium (300-400mm)",
        soilType: "Well-drained loamy soil",
        marketPrice: "₹2,200-2,500",
        yieldPotential: "25-35 quintals",
        growthDuration: 120,
        climate: "Cool and dry",
        description: { 
          en: "Wheat is the second most important cereal crop in India after rice.",
          hi: "गेहूं चावल के बाद भारत की दूसरी सबसे महत्वपूर्ण अनाज फसल है।"
        }
      },
      {
        id: "rice",
        name: { en: "Rice", hi: "चावल" },
        category: "cereals",
        image: "https://images.unsplash.com/photo-1670922757779-9472463fe234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZCUyMGZhcm1pbmd8ZW58MXx8fHwxNzU3Njk2MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Kharif (Jun-Oct)",
        waterRequirement: "High (1000-1200mm)",
        soilType: "Clay or clay loam",
        marketPrice: "₹1,800-2,200",
        yieldPotential: "30-40 quintals",
        growthDuration: 90,
        climate: "Warm and humid",
        description: { 
          en: "Rice is the staple food crop of India and feeds more than half of the population.",
          hi: "चावल भारत की मुख्य खाद्य फसल है और आधी से अधिक आबादी का भरण-पोषण करती है।"
        }
      },
      {
        id: "tomato",
        name: { en: "Tomato", hi: "टमाटर" },
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1744726012389-66b13af6e59d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU3Njk2MjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Year round",
        waterRequirement: "Medium (400-600mm)",
        soilType: "Well-drained sandy loam",
        marketPrice: "₹15-25 per kg",
        yieldPotential: "200-300 quintals",
        growthDuration: 75,
        climate: "Warm temperate",
        description: { 
          en: "Tomato is one of the most important vegetable crops worldwide.",
          hi: "टमाटर दुनिया भर में सबसे महत्वपूर्ण सब्जी फसलों में से एक है।"
        }
      },
      {
        id: "potato",
        name: { en: "Potato", hi: "आलू" },
        category: "vegetables",
        image: "https://images.unsplash.com/photo-1649945434181-14f8c901ebe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBmYXJtaW5nJTIwZmllbGR8ZW58MXx8fHwxNzU3Njk2MjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Rabi (Oct-Mar)",
        waterRequirement: "Medium (500-700mm)",
        soilType: "Sandy loam",
        marketPrice: "₹8-15 per kg",
        yieldPotential: "150-250 quintals",
        growthDuration: 90,
        climate: "Cool and dry",
        description: { 
          en: "Potato is the fourth most important food crop in the world.",
          hi: "आलू दुनिया की चौथी सबसे महत्वपूर्ण खाद्य फसल है।"
        }
      },
      {
        id: "sugarcane",
        name: { en: "Sugarcane", hi: "गन्ना" },
        category: "cereals",
        image: "https://images.unsplash.com/photo-1573605954553-a39394846cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBmYXJtaW5nJTIwZmllbGR8ZW58MXx8fHwxNzU3Njk2MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Year round",
        waterRequirement: "High (1500-2500mm)",
        soilType: "Deep, well-drained soil",
        marketPrice: "₹280-350 per quintal",
        yieldPotential: "600-800 quintals",
        growthDuration: 365,
        climate: "Tropical and subtropical",
        description: { 
          en: "Sugarcane is the main source of sugar and ethanol production.",
          hi: "गन्ना चीनी और इथेनॉल उत्पादन का मुख्य स्रोत है।"
        }
      },
      {
        id: "cotton",
        name: { en: "Cotton", hi: "कपास" },
        category: "cereals",
        image: "https://images.unsplash.com/photo-1616504297622-a9819f1227e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBmYXJtaW5nJTIwZmllbGR8ZW58MXx8fHwxNzU3Njk2MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        season: "Kharif (Apr-Oct)",
        waterRequirement: "Medium (500-1000mm)",
        soilType: "Black cotton soil",
        marketPrice: "₹5,500-6,500 per quintal",
        yieldPotential: "15-25 quintals",
        growthDuration: 180,
        climate: "Warm and humid",
        description: { 
          en: "Cotton is the most important cash crop and fiber crop of India.",
          hi: "कपास भारत की सबसे महत्वपूर्ण नकदी फसल और रेशा फसल है।"
        }
      }
    ];

    setCrops(mockCrops);
    setIsLoading(false);
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.name.hi.includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (category: string) => {
    const categoryMap = {
      all: t.allCrops,
      cereals: t.cereals,
      vegetables: t.vegetables,
      fruits: t.fruits,
      pulses: t.pulses,
      spices: t.spices
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-2xl text-yellow-800">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                  {cropCategories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-xs">
                      {getCategoryName(category)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12 space-y-4 flex-col">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
                <p className="text-muted-foreground">{t.loading}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crops Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {crop.image && (
                    <ImageWithFallback
                      src={crop.image}
                      alt={crop.name.en}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {getCategoryName(crop.category)}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {selectedLanguage === 'hi' ? crop.name.hi : crop.name.en}
                    </span>
                    <Wheat className="h-5 w-5 text-yellow-600" />
                  </CardTitle>
                  <CardDescription>
                    {selectedLanguage === 'hi' ? crop.description.hi : crop.description.en}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">{t.growingSeason}</p>
                        <p className="text-muted-foreground">{crop.season}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium">{t.waterRequirement}</p>
                        <p className="text-muted-foreground">{crop.waterRequirement}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">{t.marketPrice}</p>
                        <p className="text-muted-foreground">{crop.marketPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="font-medium">{t.yieldPotential}</p>
                        <p className="text-muted-foreground">{crop.yieldPotential} {t.perAcre}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="font-medium">{t.growthDuration}</p>
                        <p className="text-muted-foreground">{crop.growthDuration} {t.days}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="font-medium">{t.climateRequirement}</p>
                        <p className="text-muted-foreground">{crop.climate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => {
                      // In a real app, this would navigate to detailed crop information
                      console.log(`Viewing details for ${crop.name.en}`);
                    }}
                  >
                    {t.viewDetails}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredCrops.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Wheat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No crops found matching your search criteria.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}