import { useEffect, useRef, useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import BookingSection from "@/components/landing/BookingSection";
import FeaturesHighlight from "@/components/landing/FeaturesHighlight";
import FloatingCustomers from "@/components/landing/FloatingCustomers";
import ProjectsCarousel from "@/components/landing/ProjectsCarousel";
import FAQ from "@/components/landing/FAQ";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection = ({ children, delay = 0 }: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
        <Header />
      
        <Hero />
        <FloatingCustomers />
      <AnimatedSection delay={100}>
        <FeaturesHighlight />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ProjectsCarousel />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <BookingSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <FAQ />
      </AnimatedSection>
      <AnimatedSection delay={0}>
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default Index;
