import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Package, Palette } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
            Revibe
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-light">
            Reimagine, Resell, Revive Your Clothes
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Buy Clothes</h3>
                <p className="text-muted-foreground mb-6">Discover pre-loved fashion at affordable prices</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => navigate('/buy')}
                  className="w-full"
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Sell Clothes</h3>
                <p className="text-muted-foreground mb-6">Turn your closet into cash with our easy process</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => navigate('/sell')}
                  className="w-full"
                >
                  Sell Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">Redesign Clothes</h3>
                <p className="text-muted-foreground mb-6">Give your clothes a fresh new look with AI</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => navigate('/redesign')}
                  className="w-full"
                >
                  Redesign
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/80 text-lg">
              All clothes are disinfected for your safety and hygiene
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;