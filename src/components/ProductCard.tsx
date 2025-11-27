import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="card-elevated group overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <span className="badge-category bg-background/90 backdrop-blur-sm">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">(250+ reviews)</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-gradient-saffron">
              {formatPrice(product.price)}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full btn-festival"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
