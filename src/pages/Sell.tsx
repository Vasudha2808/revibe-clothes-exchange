import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Clock, DollarSign, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Sell = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error("Please upload a photo of your dress first!");
      return;
    }
    
    setIsSubmitted(true);
    toast.success("Photo sent to company for evaluation!");
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
            <h1 className="text-3xl font-bold">Sell Your Clothes</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Dress Photo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-48 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">Upload a photo</p>
                      <p className="text-sm text-muted-foreground">
                        Take a clear photo of your dress for best evaluation
                      </p>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="mt-4 cursor-pointer" asChild>
                    <span>{previewUrl ? "Change Photo" : "Choose File"}</span>
                  </Button>
                </label>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleSubmit}
                disabled={!selectedFile || isSubmitted}
                className="w-full"
              >
                {isSubmitted ? "Sent to Company" : "Send to Company"}
              </Button>

              {isSubmitted && (
                <div className="bg-accent/20 border border-accent rounded-lg p-4">
                  <p className="text-accent-foreground font-medium">
                    ✓ Photo submitted successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Our team will evaluate your dress and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Process Information */}
          <div className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Upload Photo</h4>
                    <p className="text-sm text-muted-foreground">
                      Take a clear photo of your dress and upload it
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Company Evaluation</h4>
                    <p className="text-sm text-muted-foreground">
                      Our experts evaluate and offer a fair price
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Accept/Reject</h4>
                    <p className="text-sm text-muted-foreground">
                      You can accept or reject our price offer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Pickup & Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      We schedule pickup and process payment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center p-4">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">24hr Response</p>
              </Card>
              <Card className="text-center p-4">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Fair Pricing</p>
              </Card>
              <Card className="text-center p-4">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Free Pickup</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;