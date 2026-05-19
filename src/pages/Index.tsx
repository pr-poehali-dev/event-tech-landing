import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import ContactSection from "@/components/ContactSection";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useReveal();

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-body">
      <NavBar />
      <HeroSection mouseX={mouse.x} mouseY={mouse.y} />
      <ContentSections />
      <ContactSection />
    </div>
  );
}