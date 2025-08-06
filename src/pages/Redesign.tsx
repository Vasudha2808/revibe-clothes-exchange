import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Sparkles, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const redesignIdeas = [
  {
    id: 1,
    title: "Vintage Cropped Style",
    description: "Transform into a trendy cropped top with vintage aesthetics",
    image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=300&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Bohemian Layers",
    description: "Add flowing layers and bohemian-inspired details",
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=300&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Modern Minimalist",
    description: "Clean lines with contemporary minimalist design",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Streetwear Edge",
    description: "Bold streetwear styling with urban elements",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Elegant Formal",
    description: "Sophisticated formal styling with elegant details",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop"
  }
];

const Redesign = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showIdeas, setShowIdeas] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const generateIdeas = () => {
    if (!selectedFile) {
      toast.error("Please upload a photo of your dress first!");
      return;
    }
    
    setShowIdeas(true);
    toast.success("AI is generating redesign ideas for you!");
  };

  const selectDesign = (designId: number) => {
    setSelectedDesign(designId);
    toast.success("Design selected! Proceeding to schedule pickup...");
  };

  const schedulePickup = () => {
    if (!selectedDesign) {
      toast.error("Please select a redesign first!");
      return;
    }
    
    setIsSubmitted(true);
    toast.success("Pickup scheduled! We'll collect your dress for redesigning.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">AI Dress Redesign</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {!showIdeas ? (
          // Upload Section
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Your Dress for Redesign
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-w-full h-64 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">
                        {selectedFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-xl font-medium">Upload your dress photo</p>
                        <p className="text-muted-foreground">
                          Our AI will analyze your dress and suggest amazing redesign ideas
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="redesign-upload"
                  />
                  <label htmlFor="redesign-upload">
                    <Button variant="outline" className="mt-4 cursor-pointer" asChild>
                      <span>{previewUrl ? "Change Photo" : "Choose File"}</span>
                    </Button>
                  </label>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={generateIdeas}
                  disabled={!selectedFile}
                  className="w-full"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Redesign Ideas
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Redesign Ideas Section
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">AI Generated Redesign Ideas</h2>
              <p className="text-muted-foreground text-lg">
                Choose your favorite redesign style below
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redesignIdeas.map(idea => (
                <Card 
                  key={idea.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedDesign === idea.id 
                      ? 'ring-2 ring-primary shadow-glow bg-gradient-secondary' 
                      : 'bg-gradient-card hover:shadow-secondary'
                  }`}
                  onClick={() => selectDesign(idea.id)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={idea.image} 
                      alt={idea.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">{idea.description}</p>
                      {selectedDesign === idea.id && (
                        <div className="mt-3 flex items-center text-primary font-medium">
                          <Sparkles className="h-4 w-4 mr-1" />
                          Selected
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedDesign && !isSubmitted && (
              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={schedulePickup}
                  className="px-12"
                >
                  <Truck className="h-5 w-5 mr-2" />
                  Schedule Pickup for Redesign
                </Button>
              </div>
            )}

            {isSubmitted && (
              <Card className="bg-accent/20 border border-accent max-w-2xl mx-auto">
                <CardContent className="text-center p-8">
                  <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-accent-foreground mb-2">
                    Pickup Scheduled Successfully!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll collect your dress within 2-3 business days. Your redesigned dress will be ready in 7-10 working days and will be delivered back to you with complete disinfection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Process Info */}
        {!showIdeas && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">How AI Redesign Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">1. Upload Photo</h4>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of your dress
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">2. AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  AI generates multiple redesign options
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-semibold mb-2">3. Select Design</h4>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred redesign style
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">4. Professional Work</h4>
                <p className="text-sm text-muted-foreground">
                  Expert tailors bring the design to life
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Redesign;