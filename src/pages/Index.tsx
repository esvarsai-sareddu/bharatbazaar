import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductGrid />
      
      <footer className="border-t border-border/40 bg-muted/30 py-8 mt-20">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 BharatBazaar. Made with ❤️ in India
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
