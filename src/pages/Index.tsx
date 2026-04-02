import Header from "@/components/layout/Header";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import Features from "@/components/landing/Features";
import Workflow from "@/components/landing/Workflow";
import Audiences from "@/components/landing/Audiences";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <SocialProof />
    <div id="features"><Features /></div>
    <Workflow />
    <Audiences />
    <Pricing />
    <FAQ />
    <Footer />
  </div>
);

export default Index;
