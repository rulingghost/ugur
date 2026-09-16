import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { InstagramHero } from "@/components/sections/InstagramHero";
import { SocialProofTicker } from "@/components/sections/SocialProofTicker";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { HowItWorksSteps } from "@/components/sections/HowItWorksSteps";
import { UnboxingPackage } from "@/components/sections/UnboxingPackage";
import { OnePageOrderEngine } from "@/components/sections/OnePageOrderEngine";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { Benefits } from "@/components/sections/Benefits";
import { FAQ } from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B132B] selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header with Urgency Bar & Navigation */}
      <Header />

      {/* Main Instagram Ads Sales Funnel */}
      <main className="flex-1 w-full">
        {/* 2. High-Impact Instagram Hero: Live Switch + Price Anchor + Kapıda Ödeme CTA */}
        <InstagramHero />

        {/* 3. Social Proof Ticker (4.9 Stars, Live Orders, Floating Toasts) */}
        <SocialProofTicker />

        {/* 4. Problem vs. Solution: Traditional Dusty Curtains vs. MARBAR Smart Film */}
        <ProblemSolution />

        {/* 5. Draggable Interactive Before / After Visualizer */}
        <BeforeAfterSlider />

        {/* 6. 3-Step Easy DIY Installation (No Handyman Needed) */}
        <HowItWorksSteps />

        {/* 7. Unboxing & Free Gift Equipment (RF Remote, Spatula, Wooden Crate) */}
        <UnboxingPackage />

        {/* 8. 🔥 THE ONE-PAGE DIRECT BUY STATION (Bundles, Custom Sizing, Same-Page Checkout) */}
        <OnePageOrderEngine />

        {/* 9. Verified Customer Reviews & Real Project Testimonials */}
        <CustomerReviews />

        {/* 10. E-Commerce Core Guarantees (Wood Crate, 2-Year Warranty, 3 Payment Ways) */}
        <Benefits />

        {/* 11. Instagram Objections & FAQ (Breakage protection, moisture, power cut) */}
        <FAQ />
      </main>

      {/* 12. E-Commerce Footer */}
      <Footer />

      {/* 13. Mobile Sticky Bottom Buy Bar */}
      <MobileStickyCTA />
    </div>
  );
}
