import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Package, Palette, User, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Revibe</div>
          <div className="flex gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-white/90 hidden md:block">
                  Welcome, {user.user_metadata?.display_name || user.email}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  className="text-white hover:bg-white/20"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-white hover:bg-white/20"
                >
                  Sign In
                </Button>
                <Button
                  variant="hero"
                  onClick={() => navigate('/auth')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

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
            Old Threads New Stories
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Buy Clothes</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Discover pre-loved fashion across Women's, Men's & Kids collections with ethnic, formal & casual styles</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => navigate('/buy')}
                  className="w-full group"
                >
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Sell Clothes</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Turn your closet into cash with our seamless process - upload, evaluate, and get paid</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => user ? navigate('/sell') : navigate('/auth')}
                  className="w-full group"
                >
                  Sell Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card backdrop-blur-sm border-white/20 hover:shadow-glow transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Palette className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Redesign Clothes</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Give your clothes a fresh new look with AI-powered redesign ideas and professional remanufacturing</p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => user ? navigate('/redesign') : navigate('/auth')}
                  className="w-full group"
                >
                  Redesign
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <p className="text-white/90 text-lg font-medium mb-2">
                🧼 Hygiene Promise
              </p>
              <p className="text-white/70">
                All clothes are professionally disinfected for your safety and hygiene
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Explore our curated collections for every style and occasion
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group cursor-pointer" onClick={() => navigate('/buy')}>
              <div className="bg-gradient-card rounded-2xl p-8 transition-all duration-300 hover:shadow-primary group-hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Women's</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Ethnic Wear</p>
                  <p>• Formal Collection</p>
                  <p>• Casual Styles</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer" onClick={() => navigate('/buy')}>
              <div className="bg-gradient-card rounded-2xl p-8 transition-all duration-300 hover:shadow-primary group-hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Men's</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Ethnic Collection</p>
                  <p>• Business Formal</p>
                  <p>• Casual Wear</p>
                </div>
              </div>
            </div>
            
            <div className="group cursor-pointer" onClick={() => navigate('/buy')}>
              <div className="bg-gradient-card rounded-2xl p-8 transition-all duration-300 hover:shadow-primary group-hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Kids</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Traditional Wear</p>
                  <p>• School Uniforms</p>
                  <p>• Playwear</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;