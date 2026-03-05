import Navbar from "@/components/Navbar";
import SwapCard from "@/components/SwapCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex items-start justify-center pt-20 px-4">
        <SwapCard />
      </main>
    </div>
  );
};

export default Index;
