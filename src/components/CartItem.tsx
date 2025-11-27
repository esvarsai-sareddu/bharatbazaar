import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border/50 animate-fade-in">
      <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {item.category}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gradient-saffron">
              {formatPrice(item.price * item.quantity)}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatPrice(item.price)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
