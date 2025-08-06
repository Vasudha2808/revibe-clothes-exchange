import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample products data
const products = [
  { id: 1, name: "Vintage Denim Jacket", category: "Men", price: 1299, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" },
  { id: 2, name: "Floral Summer Dress", category: "Women", price: 899, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { id: 3, name: "Kids Cotton T-Shirt", category: "Kids", price: 399, image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400" },
  { id: 4, name: "Leather Handbag", category: "Accessories", price: 1599, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 5, name: "Running Sneakers", category: "Footwear", price: 1899, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400" },
  { id: 6, name: "Formal Blazer", category: "Men", price: 2199, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
  { id: 7, name: "Casual Jeans", category: "Women", price: 1099, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
  { id: 8, name: "School Backpack", category: "Kids", price: 799, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
];

const categories = ["All", "Men", "Women", "Kids", "Accessories", "Footwear"];

const Buy = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success("Item added to cart!");
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="text-primary-foreground hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">Buy Pre-Loved Fashion</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={proceedToCheckout}
                className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="bg-gradient-card hover:shadow-secondary transition-all duration-300">
              <CardContent className="p-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="fashion" 
                  className="w-full"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buy;