import { Button } from "@/components/ui/button";
import heroBazaar from "@/assets/hero-bazaar.jpg";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] w-full overflow-hidden rangoli-pattern">
      <div className="absolute inset-0">
        <img
          src={heroBazaar}
          alt="Indian marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative container px-4 py-20 md:py-32">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="inline-block">
            <span className="badge-category">
              Welcome to India's Digital Marketplace
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Experience the{" "}
            <span className="text-gradient-festival">
              Colors of India
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Discover authentic Indian products from electronics to traditional crafts. 
            Your one-stop destination for quality and culture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="btn-festival text-base md:text-lg h-12 px-8"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-base md:text-lg h-12 px-8 border-2 border-primary hover:bg-primary/10"
            >
              Explore Categories
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-6">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-saffron">1000+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-saffron">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient-saffron">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
