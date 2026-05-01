"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ExperienceGallery } from "@/components/presentation-section"; 
import PricingSection from "@/components/pricingsection";
import { AtractiiSection } from "@/components/atractii-section";
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section";
import { FooterSection } from "@/components/footer-section";
export default function HomePage() {
  return (
    <>

      <Header />
      
      <main className="bg-black">
        <HeroSection />
        <ExperienceGallery />
        <PricingSection />
        <ReviewsSection />
        <ContactSection />
        <AtractiiSection />
        <FooterSection />
      </main>
    </>
  );
}