import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/CartItem";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryCharge = totalPrice > 0 && totalPrice < 5000 ? 99 : 0;
  const finalTotal = totalPrice + deliveryCharge;

  return (
    <div className="min-h-screen bg-background rangoli-pattern">
      <Header />
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 hover:text-primary"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-festival">
                Shopping Cart
              </h1>
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Clear All
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <Card className="card-elevated">
                <CardContent className="py-20 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Add some products to get started!
                  </p>
                  <Button
                    onClick={() => navigate("/")}
                    className="btn-festival"
                  >
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="card-elevated sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">
                        Subtotal ({totalItems} items)
                      </span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Delivery Charges</span>
                      <span className="font-medium">
                        {deliveryCharge === 0 ? (
                          <span className="text-accent">FREE</span>
                        ) : (
                          formatPrice(deliveryCharge)
                        )}
                      </span>
                    </div>

                    {totalPrice < 5000 && totalPrice > 0 && (
                      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                        Add {formatPrice(5000 - totalPrice)} more for FREE delivery!
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-gradient-saffron">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  <Button
                    className="w-full btn-festival text-lg h-12"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    Secure checkout powered by BharatBazaar
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
