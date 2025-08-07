import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample products data with new categories and subcategories
const products = [
  { id: 1, name: "Silk Saree", category: "Women", subCategory: "Ethnic", price: 2299, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400" },
  { id: 2, name: "Kurta Set", category: "Men", subCategory: "Ethnic", price: 1899, image: "https://images.unsplash.com/photo-1566479945946-b063c6b2c4d5?w=400" },
  { id: 3, name: "Business Suit", category: "Men", subCategory: "Formal", price: 4999, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
  { id: 4, name: "Evening Gown", category: "Women", subCategory: "Formal", price: 3499, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { id: 5, name: "Casual Jeans", category: "Women", subCategory: "Casual", price: 1299, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
  { id: 6, name: "T-Shirt", category: "Men", subCategory: "Casual", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 7, name: "Kids Lehenga", category: "Kids", subCategory: "Ethnic", price: 1599, image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400" },
  { id: 8, name: "School Uniform", category: "Kids", subCategory: "Formal", price: 899, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400" },
  { id: 9, name: "Kids Casual Wear", category: "Kids", subCategory: "Casual", price: 599, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400" },
  { id: 10, name: "Anarkali Dress", category: "Women", subCategory: "Ethnic", price: 2799, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
  { id: 11, name: "Formal Shirt", category: "Men", subCategory: "Formal", price: 1199, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400" },
  { id: 12, name: "Summer Dress", category: "Women", subCategory: "Casual", price: 999, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
];

const categories = ["All", "Women", "Men", "Kids"];
const subCategories = ["All", "Ethnic", "Formal", "Casual"];

const Buy = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const subCategoryMatch = selectedSubCategory === "All" || product.subCategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

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
          <h2 className="text-2xl font-bold mb-6">Shop by Style</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Style</label>
              <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {subCategories.map(subCategory => (
                    <SelectItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
                    <div className="flex gap-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">{product.subCategory}</Badge>
                    </div>
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