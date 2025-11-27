import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const deliveryCharge = totalPrice < 5000 ? 99 : 0;
  const finalTotal = totalPrice + deliveryCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    toast.success("Order placed successfully!");
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 3000);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background rangoli-pattern">
        <Header />
        <div className="container px-4 py-20 max-w-2xl mx-auto">
          <Card className="card-elevated text-center">
            <CardContent className="py-16">
              <CheckCircle2 className="h-20 w-20 mx-auto text-accent mb-6" />
              <h1 className="text-3xl font-display font-bold text-gradient-festival mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Thank you for shopping with BharatBazaar
              </p>
              <p className="text-muted-foreground mb-8">
                Your order will be delivered within 3-5 business days
              </p>
              <Button
                onClick={() => navigate("/")}
                className="btn-festival"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background rangoli-pattern">
      <Header />
      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 hover:text-primary"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-festival mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="font-display">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Raj" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Sharma" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="raj@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 MG Road" required />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Mumbai" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Maharashtra" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="400001" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="font-display">Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="cod" name="payment" value="cod" defaultChecked />
                    <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pay when you receive your order at your doorstep
                  </p>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full btn-festival text-lg h-12">
                Place Order - {formatPrice(finalTotal)}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="card-elevated sticky top-24">
              <CardHeader>
                <CardTitle className="font-display">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-gradient-saffron">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
