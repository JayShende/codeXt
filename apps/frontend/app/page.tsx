import Features from "@/components/features";
import FooterSection from "@/components/footer-four";
import HeroSection from "@/components/hero-section-one";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <FooterSection/>
    </>
  );
};

export default Home;
