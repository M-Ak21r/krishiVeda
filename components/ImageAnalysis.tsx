import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Camera, 
  Upload, 
  ArrowLeft, 
  MapPin,
  Thermometer,
  Droplets,
  Leaf,
  Bug,
  Beaker,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageAnalysisProps {
  selectedLanguage: string;
  onBack: () => void;
}

const translations = {
  en: {
    title: "Crop Image Analysis",
    subtitle: "Upload or capture images for AI-powered analysis",
    uploadButton: "Upload Image",
    cameraButton: "Capture Photo",
    analyzing: "Analyzing image...",
    results: "Analysis Results",
    soilType: "Soil Type",
    cropHealth: "Crop Health",
    recommendations: "Recommendations",
    weather: "Weather Conditions",
    pesticides: "Pesticide Suggestions",
    chemicals: "Chemical Requirements",
    back: "Back to Dashboard",
    cameraError: "Camera access denied. Please upload an image instead.",
    cameraUnavailable: "Camera is not available on this device.",
    permissionDenied: "Camera permission was denied. You can still upload images.",
    tryAgain: "Try Camera Again",
    closeCamera: "Close Camera"
  },
  hi: {
    title: "फसल छवि विश्लेषण",
    subtitle: "AI-संचालित विश्लेषण के लिए छवियां अपलोड या कैप्चर करें",
    uploadButton: "छवि अपलोड करें",
    cameraButton: "फोटो कैप्चर करें",
    analyzing: "छवि का विश्लेषण हो रहा है...",
    results: "विश्लेषण परिणाम",
    soilType: "मिट्टी का प्रकार",
    cropHealth: "फसल स्वास्थ्य",
    recommendations: "सुझाव",
    weather: "मौसम की स्थिति",
    pesticides: "कीटनाशक सुझाव",
    chemicals: "रासायनिक आवश्यकताएं",
    back: "डैशबोर्ड पर वापस जाएं",
    cameraError: "कैमरा एक्सेस से इनकार कर दिया। कृपया इसके बजाय एक छवि अपलोड करें।",
    cameraUnavailable: "इस डिवाइस पर कैमरा उपलब्ध नहीं है।",
    permissionDenied: "कैमरा अनुमति से इनकार कर दिया गया था। आप अभी भी छवियां अपलोड कर सकते हैं।",
    tryAgain: "कैमरा फिर से आज़माएं",
    closeCamera: "कैमरा बंद करें"
  }
};

interface AnalysisResult {
  soilType: string;
  soilHealth: string;
  cropType: string;
  cropHealth: string;
  weatherRecommendations: string[];
  pesticideRecommendations: string[];
  chemicalRequirements: string[];
  confidence: number;
}

export function ImageAnalysis({ selectedLanguage, onBack }: ImageAnalysisProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  // Mock analysis function - in real app, this would call AI service
  const mockAnalysis = (): AnalysisResult => ({
    soilType: "Loamy Soil",
    soilHealth: "Good",
    cropType: "Wheat",
    cropHealth: "Healthy",
    weatherRecommendations: [
      "Optimal temperature: 15-25°C",
      "Required rainfall: 50-75cm annually",
      "Humidity: 50-70%"
    ],
    pesticideRecommendations: [
      "Neem-based organic pesticide",
      "Bacillus thuringiensis for caterpillars",
      "Copper oxychloride for fungal diseases"
    ],
    chemicalRequirements: [
      "NPK fertilizer (12:32:16)",
      "Phosphorus boost during flowering",
      "Potassium supplement for grain filling"
    ],
    confidence: 87
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null); // Reset any previous errors
      
      // Check if camera is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(t.cameraUnavailable);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera if available
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error: any) {
      console.error("Error accessing camera:", error);
      
      // Handle different types of camera errors
      if (error.name === 'NotAllowedError') {
        setCameraError(t.permissionDenied);
      } else if (error.name === 'NotFoundError') {
        setCameraError(t.cameraUnavailable);
      } else if (error.name === 'NotReadableError') {
        setCameraError(t.cameraError);
      } else {
        setCameraError(t.cameraError);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setSelectedImage(imageData);
        
        // Stop camera
        stopCamera();
        
        analyzeImage();
      }
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setAnalysisResult(mockAnalysis());
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Button>
          <div>
            <h1 className="text-2xl text-green-800">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Upload/Capture Section */}
          <Card>
            <CardHeader>
              <CardTitle>Image Input</CardTitle>
              <CardDescription>Upload an image or capture using camera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Camera Error Display */}
              {cameraError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-red-800">
                    <Camera className="h-4 w-4" />
                    <span className="font-medium">Camera Issue</span>
                  </div>
                  <p className="text-red-700 text-sm">{cameraError}</p>
                  <Button 
                    onClick={() => {
                      setCameraError(null);
                      startCamera();
                    }}
                    variant="outline" 
                    size="sm"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    {t.tryAgain}
                  </Button>
                </div>
              )}

              {!selectedImage && !isCapturing && !cameraError && (
                <div className="space-y-4">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/75 flex flex-col items-center justify-center gap-2"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8" />
                    {t.uploadButton}
                  </Button>
                  
                  <Button 
                    onClick={startCamera}
                    className="w-full h-32 bg-green-600 hover:bg-green-700 flex flex-col items-center justify-center gap-2"
                  >
                    <Camera className="h-8 w-8" />
                    {t.cameraButton}
                  </Button>
                </div>
              )}

              {!selectedImage && !isCapturing && cameraError && (
                <div className="space-y-4">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/75 flex flex-col items-center justify-center gap-2"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8" />
                    {t.uploadButton}
                  </Button>
                </div>
              )}

              {isCapturing && (
                <div className="space-y-4">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-64 object-cover rounded-lg bg-black"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={capturePhoto} 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                    <Button 
                      onClick={stopCamera} 
                      variant="outline"
                      className="px-4"
                    >
                      {t.closeCamera}
                    </Button>
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="space-y-4">
                  <ImageWithFallback 
                    src={selectedImage} 
                    alt="Uploaded crop image" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button 
                    onClick={() => {
                      setSelectedImage(null);
                      setAnalysisResult(null);
                      setIsAnalyzing(false);
                      setCameraError(null); // Reset camera error when uploading new image
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Upload New Image
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t.results}</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                  <p className="text-muted-foreground">{t.analyzing}</p>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      Confidence: {analysisResult.confidence}%
                    </Badge>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>

                  <div className="space-y-4">
                    {/* Soil Analysis */}
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {t.soilType}
                      </h3>
                      <p className="bg-muted p-3 rounded-lg">{analysisResult.soilType}</p>
                      <Badge variant="secondary">{analysisResult.soilHealth}</Badge>
                    </div>

                    <Separator />

                    {/* Crop Health */}
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" />
                        {t.cropHealth}
                      </h3>
                      <p className="bg-muted p-3 rounded-lg">{analysisResult.cropType}</p>
                      <Badge variant="secondary">{analysisResult.cropHealth}</Badge>
                    </div>

                    <Separator />

                    {/* Weather Recommendations */}
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        {t.weather}
                      </h3>
                      <ul className="space-y-1">
                        {analysisResult.weatherRecommendations.map((rec, index) => (
                          <li key={index} className="bg-blue-50 p-2 rounded text-sm">
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Pesticide Recommendations */}
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2">
                        <Bug className="h-4 w-4" />
                        {t.pesticides}
                      </h3>
                      <ul className="space-y-1">
                        {analysisResult.pesticideRecommendations.map((rec, index) => (
                          <li key={index} className="bg-red-50 p-2 rounded text-sm">
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Chemical Requirements */}
                    <div className="space-y-2">
                      <h3 className="flex items-center gap-2">
                        <Beaker className="h-4 w-4" />
                        {t.chemicals}
                      </h3>
                      <ul className="space-y-1">
                        {analysisResult.chemicalRequirements.map((req, index) => (
                          <li key={index} className="bg-purple-50 p-2 rounded text-sm">
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {!isAnalyzing && !analysisResult && (
                <div className="text-center py-12 text-muted-foreground">
                  Upload or capture an image to start analysis
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}