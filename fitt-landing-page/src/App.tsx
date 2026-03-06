import Nav from "./components/Nav";
import Hero from "./components/Hero";
import LogoBar from "./components/LogoBar";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Demo from "./components/Demo";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0F; color: #F5F5F0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: rgba(232,197,71,0.25); color: #F5F5F0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: rgba(232,197,71,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(232,197,71,0.35); }
        input::placeholder { color: rgba(245,245,240,0.3); }

        .desktop-nav { display: flex !important; }
        .mobile-only { display: none !important; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; }
        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .demo-grid { grid-template-columns: 1fr !important; }
          .demo-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }
        }
      `}</style>

      <div style={{ background: "#0A0A0F", minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <LogoBar />
        <Problem />
        <HowItWorks />
        <Demo />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
