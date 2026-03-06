import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function useInViewAnimation(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px",
    amount: threshold,
  });
  return [ref, inView];
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Product", target: "features" },
    { label: "Pricing", target: "pricing" },
    { label: "How It Works", target: "how-it-works" },
    { label: "Demo", target: "demo" },
  ];

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToSection(target), 100);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #E8C547 0%, #F0A500 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L13 5V11L8 14L3 11V5L8 2Z" fill="#0A0A0F" strokeWidth="0" />
                <circle cx="8" cy="8" r="2" fill="#E8C547" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "#F5F5F0",
                letterSpacing: "-0.3px",
              }}
            >
              Fitt<span style={{ color: "#E8C547" }}>.</span>
            </span>
          </div>

          {/* Desktop links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 32 }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.target);
                }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,245,240,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F5F0")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.55)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("pricing");
              }}
              className="desktop-nav"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(245,245,240,0.6)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Log in
            </a>
            <motion.a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("cta");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="desktop-nav"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                background: "#E8C547",
                color: "#0A0A0F",
                padding: "8px 18px",
                borderRadius: 8,
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              Book a Demo
            </motion.a>

            {/* Hamburger button (mobile only) */}
            <button
              className="mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                zIndex: 60,
              }}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 2,
                  transformOrigin: "center",
                }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 2,
                }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 2,
                  transformOrigin: "center",
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 45,
              background: "rgba(10,10,15,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={`#${link.target}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.target);
                  }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#F5F5F0",
                    textDecoration: "none",
                    padding: "16px 32px",
                    borderRadius: 12,
                    transition: "background 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "transparent")}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.06 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("cta");
                }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  background: "#E8C547",
                  color: "#0A0A0F",
                  padding: "14px 36px",
                  borderRadius: 10,
                  textDecoration: "none",
                  marginTop: 24,
                  cursor: "pointer",
                }}
              >
                Book a Demo →
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "120px clamp(1.5rem, 5vw, 3rem) 80px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
          linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(232,197,71,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(232,197,71,0.1)",
              border: "1px solid rgba(232,197,71,0.2)",
              borderRadius: 100,
              padding: "5px 14px",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E8C547",
                boxShadow: "0 0 8px #E8C547",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 500,
                color: "#E8C547",
                letterSpacing: "0.5px",
              }}
            >
              NOW LIVE — SHOPIFY & WOOCOMMERCE
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#F5F5F0",
            margin: "0 0 24px",
            letterSpacing: "-2px",
          }}
        >
          Turn Browsers Into Buyers
          <br />
          <span style={{ color: "#E8C547" }}>With Photorealistic Try-On</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(245,245,240,0.55)",
            lineHeight: 1.65,
            maxWidth: 620,
            margin: "0 auto 44px",
          }}
        >
          Fitt lets shoppers see themselves in your clothing before they buy —
          reducing returns by up to 35% and lifting conversion rates by 2×.
          Plug-and-play integration. Zero engineering required.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.a
            href="#cta"
            onClick={(e) => { e.preventDefault(); scrollToSection("cta"); }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 30px rgba(232,197,71,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              background: "#E8C547",
              color: "#0A0A0F",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            Book a Demo →
          </motion.a>
          <motion.a
            href="#demo"
            onClick={(e) => { e.preventDefault(); scrollToSection("demo"); }}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.06)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "rgba(245,245,240,0.75)",
              padding: "13px 28px",
              borderRadius: 10,
              textDecoration: "none",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "inline-block",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
          >
            See Live Demo
          </motion.a>
        </motion.div>

        {/* Social proof - animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 56,
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "2.1×", label: "Avg. Conversion Lift" },
            { val: "35%", label: "Return Rate Reduction" },
            { val: "<3 days", label: "Integration Time" },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.9rem",
                  fontWeight: 700,
                  color: "#F5F5F0",
                  letterSpacing: "-1px",
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(245,245,240,0.4)",
                  letterSpacing: "0.5px",
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── LOGOS ────────────────────────────────────────────────────────────────────
function LogoBar() {
  const brands = [
    "Loom & Co.",
    "Fabindia Next",
    "Thread House",
    "Clovia Basics",
    "Zeroknot",
    "House of Pret",
  ];
  return (
    <section
      id="logos"
      style={{
        padding: "48px clamp(1.5rem, 5vw, 3rem)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(245,245,240,0.3)",
            textAlign: "center",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Trusted by fast-growing fashion brands
        </p>
        <motion.div
          animate={{ x: [0, -600] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            gap: "clamp(40px, 6vw, 80px)",
            width: "fit-content",
          }}
        >
          {[...brands, ...brands, ...brands].map((b, i) => (
            <span
              key={`${b}-${i}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(245,245,240,0.2)",
                letterSpacing: "-0.3px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────
function Problem() {
  const [ref, inView] = useInViewAnimation();
  const problems = [
    {
      icon: "↩",
      stat: "30%",
      text: "of fashion orders are returned — most because the product looked different than expected.",
    },
    {
      icon: "↓",
      stat: "1.5%",
      text: "average fashion e-commerce conversion. The rest leave without buying.",
    },
    {
      icon: "💸",
      stat: "₹45L+",
      text: "annual revenue lost to return logistics for a ₹10Cr GMV brand.",
    },
  ];
  return (
    <section id="problem" style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            The Problem
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 60,
              maxWidth: 600,
            }}
          >
            Uncertainty kills conversions.
            <br />
            Blind purchases drive returns.
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {problems.map(({ icon, stat, text }, idx) => (
              <motion.div
                key={stat}
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -6, borderColor: "rgba(232,197,71,0.2)" }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "#E8C547",
                    letterSpacing: "-1px",
                    marginBottom: 10,
                  }}
                >
                  {stat}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "rgba(245,245,240,0.55)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInViewAnimation();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const steps = [
    {
      num: "01",
      title: "Shopper uploads a photo",
      desc: "A single selfie or full-body photo. Processed entirely on our privacy-first infrastructure — never stored or shared.",
      detail: "Our system accepts JPEG, PNG, and WebP formats. The AI automatically detects body pose and proportions in under 500ms.",
    },
    {
      num: "02",
      title: "AI generates the try-on",
      desc: "Our photorealistic model renders your catalog clothing onto the shopper's body in under 4 seconds.",
      detail: "Using a proprietary diffusion model fine-tuned on fashion data, we handle fabric drape, lighting consistency, and body-type accuracy.",
    },
    {
      num: "03",
      title: "Shopper buys with confidence",
      desc: "They see how it fits, how it drapes, how it looks on their body type — and they convert.",
      detail: "Shoppers can try multiple items, compare looks, and share results — all within your product page. No app download needed.",
    },
  ];
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px clamp(1.5rem, 5vw, 3rem)",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            How It Works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 72,
              maxWidth: 520,
            }}
          >
            From product page to purchase in three steps.
          </motion.h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 28,
                top: 48,
                bottom: 48,
                width: 1,
                background:
                  "linear-gradient(to bottom, rgba(232,197,71,0.3), transparent)",
              }}
            />
            {steps.map(({ num, title, desc, detail }, idx) => (
              <motion.div
                key={num}
                variants={fadeUp}
                custom={idx}
                onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                style={{
                  display: "flex",
                  gap: "clamp(20px, 4vw, 40px)",
                  padding: "36px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  animate={activeStep === idx ? { scale: 1.1, borderColor: "rgba(232,197,71,0.5)" } : { scale: 1, borderColor: "rgba(232,197,71,0.2)" }}
                  style={{
                    flexShrink: 0,
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: activeStep === idx ? "rgba(232,197,71,0.2)" : "rgba(232,197,71,0.1)",
                    border: "1px solid rgba(232,197,71,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#E8C547",
                    }}
                  >
                    {num}
                  </span>
                </motion.div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#F5F5F0",
                      margin: "0 0 10px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      color: "rgba(245,245,240,0.5)",
                      lineHeight: 1.7,
                      margin: 0,
                      maxWidth: 520,
                    }}
                  >
                    {desc}
                  </p>
                  <AnimatePresence>
                    {activeStep === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "#E8C547",
                            lineHeight: 1.7,
                            marginTop: 14,
                            padding: "12px 16px",
                            background: "rgba(232,197,71,0.06)",
                            borderRadius: 10,
                            border: "1px solid rgba(232,197,71,0.12)",
                            maxWidth: 520,
                          }}
                        >
                          💡 {detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── DEMO ─────────────────────────────────────────────────────────────────────
function Demo() {
  const [ref, inView] = useInViewAnimation();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(false);
  const [selectedGarment, setSelectedGarment] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const processingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const garments = [
    { name: "Silk Kurta", emoji: "👘", color: "#E8C547" },
    { name: "Denim Jacket", emoji: "🧥", color: "#6B9BD2" },
    { name: "Summer Dress", emoji: "👗", color: "#E87C7C" },
    { name: "Blazer", emoji: "🧑‍💼", color: "#9B7CDB" },
  ];

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (processingTimerRef.current) clearTimeout(processingTimerRef.current);
    };
  }, []);

  const startProcessing = useCallback((imageUrl: string) => {
    setUploadedImage(imageUrl);
    setResult(false);
    setProcessing(true);
    if (processingTimerRef.current) clearTimeout(processingTimerRef.current);
    processingTimerRef.current = setTimeout(() => {
      setProcessing(false);
      setResult(true);
    }, 2500);
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (dataUrl) {
        startProcessing(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  }, [startProcessing]);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setProcessing(false);
    setResult(false);
    if (processingTimerRef.current) clearTimeout(processingTimerRef.current);
  }, []);

  const handleTryAnother = useCallback(() => {
    setResult(false);
    setProcessing(true);
    if (processingTimerRef.current) clearTimeout(processingTimerRef.current);
    processingTimerRef.current = setTimeout(() => {
      setProcessing(false);
      setResult(true);
    }, 2000);
  }, []);

  return (
    <section id="demo" style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Live Demo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 16,
            }}
          >
            See it on your products.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(245,245,240,0.5)",
              marginBottom: 48,
              maxWidth: 500,
              lineHeight: 1.65,
            }}
          >
            Upload a photo and try on any item from our demo catalog. No sign-up
            required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Garment selector */}
            <div style={{
              padding: "20px 28px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(245,245,240,0.4)",
                marginRight: 8,
              }}>
                Select garment:
              </span>
              {garments.map((g, i) => (
                <motion.button
                  key={g.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedGarment(i);
                    if (uploadedImage && result) handleTryAnother();
                  }}
                  style={{
                    background: selectedGarment === i ? `${g.color}22` : "rgba(255,255,255,0.04)",
                    border: selectedGarment === i ? `1px solid ${g.color}55` : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "8px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{g.emoji}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: selectedGarment === i ? 600 : 400,
                    color: selectedGarment === i ? g.color : "rgba(245,245,240,0.5)",
                  }}>
                    {g.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Demo UI */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: 440,
              }}
              className="demo-grid"
            >
              {/* Left - upload */}
              <div
                style={{
                  padding: "48px clamp(20px, 4vw, 40px)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                {uploadedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      width: "100%",
                      maxWidth: 280,
                      aspectRatio: "3/4",
                      borderRadius: 16,
                      overflow: "hidden",
                      position: "relative",
                      border: "2px solid rgba(232,197,71,0.3)",
                    }}
                  >
                    <img
                      src={uploadedImage}
                      alt="Uploaded photo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleReset();
                      }}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(10,10,15,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#F5F5F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: 14,
                        backdropFilter: "blur(8px)",
                        zIndex: 5,
                      }}
                    >
                      ✕
                    </motion.button>
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "12px",
                      background: "linear-gradient(transparent, rgba(10,10,15,0.85))",
                    }}>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "#E8C547",
                        fontWeight: 600,
                      }}>
                        ✓ Photo uploaded
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  /* Upload area: uses a native <label> wrapping a real <input type="file"> 
                     so the browser natively opens the file dialog on click — 
                     no programmatic .click() needed */
                  <label
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(true); }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragOver(false); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) processFile(file);
                    }}
                    style={{
                      width: "100%",
                      maxWidth: 280,
                      aspectRatio: "3/4",
                      border: dragOver ? "2px dashed rgba(232,197,71,0.7)" : "2px dashed rgba(255,255,255,0.15)",
                      borderRadius: 16,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      background: dragOver ? "rgba(232,197,71,0.08)" : "transparent",
                      position: "relative",
                    }}
                  >
                    {/* The real file input — fills the entire label, transparent */}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) processFile(file);
                        e.target.value = "";
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                    />
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "rgba(232,197,71,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        pointerEvents: "none",
                      }}
                    >
                      📸
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: dragOver ? "#E8C547" : "rgba(245,245,240,0.5)",
                        textAlign: "center",
                        fontWeight: 500,
                        transition: "color 0.2s",
                        pointerEvents: "none",
                      }}
                    >
                      {dragOver ? "Drop your photo here" : "Click to upload photo"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: "rgba(245,245,240,0.25)",
                        textAlign: "center",
                        pointerEvents: "none",
                      }}
                    >
                      JPEG, PNG, or WebP
                    </span>
                  </label>
                )}
              </div>

              {/* Right - result */}
              <div
                style={{
                  padding: "48px clamp(20px, 4vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <AnimatePresence mode="wait">
                  {processing ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        width: "100%",
                        maxWidth: 280,
                        aspectRatio: "3/4",
                        borderRadius: 16,
                        border: "1px solid rgba(232,197,71,0.2)",
                        background: "rgba(232,197,71,0.04)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "3px solid rgba(232,197,71,0.2)",
                          borderTopColor: "#E8C547",
                        }}
                      />
                      <div style={{ textAlign: "center" }}>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          color: "#E8C547",
                          fontWeight: 600,
                          display: "block",
                        }}>
                          Processing...
                        </span>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "rgba(245,245,240,0.35)",
                          marginTop: 6,
                          display: "block",
                        }}>
                          AI is generating your try-on
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div style={{
                        width: "60%",
                        height: 3,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}>
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.5, ease: "easeInOut" }}
                          style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #E8C547, #F0A500)",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        width: "100%",
                        maxWidth: 280,
                        aspectRatio: "3/4",
                        background:
                          `linear-gradient(135deg, ${garments[selectedGarment].color}22 0%, ${garments[selectedGarment].color}0D 100%)`,
                        borderRadius: 16,
                        border: `1px solid ${garments[selectedGarment].color}44`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                          pointerEvents: "none",
                        }}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        style={{ fontSize: 40 }}
                      >
                        {garments[selectedGarment].emoji}
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 16,
                          color: garments[selectedGarment].color,
                          fontWeight: 700,
                        }}
                      >
                        Try-on generated!
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          color: "rgba(245,245,240,0.5)",
                          textAlign: "center",
                          maxWidth: 200,
                        }}
                      >
                        {garments[selectedGarment].name} rendered on your photo
                      </motion.span>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{
                          display: "flex",
                          gap: 8,
                          marginTop: 8,
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleReset}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "8px 14px",
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(245,245,240,0.6)",
                            cursor: "pointer",
                          }}
                        >
                          New Photo
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToSection("cta")}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "8px 14px",
                            borderRadius: 8,
                            background: garments[selectedGarment].color,
                            border: "none",
                            color: "#0A0A0F",
                            cursor: "pointer",
                          }}
                        >
                          Get Fitt →
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        width: "100%",
                        maxWidth: 280,
                        aspectRatio: "3/4",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 16,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: 32 }}>{garments[selectedGarment].emoji}</span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          color: "rgba(245,245,240,0.25)",
                          textAlign: "center",
                          maxWidth: 180,
                        }}
                      >
                        Upload a photo to see the {garments[selectedGarment].name} try-on result
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                padding: "20px clamp(20px, 4vw, 40px)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "rgba(245,245,240,0.35)",
                }}
              >
                🔒 Photos are processed in-memory and never stored
              </span>
              <motion.a
                href="#cta"
                onClick={(e) => { e.preventDefault(); scrollToSection("cta"); }}
                whileHover={{ scale: 1.02, x: 4 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#E8C547",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Try on your own catalog →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
function Features() {
  const [ref, inView] = useInViewAnimation();
  const features = [
    {
      icon: "🏪",
      title: "Plug-and-play widget",
      desc: "One script tag or a Shopify app install. No backend work. No engineering sprint. Live in under 3 days.",
    },
    {
      icon: "🔒",
      title: "Privacy-first by design",
      desc: "Shopper photos are processed in-memory, never stored. GDPR and India DPDP compliant out of the box.",
    },
    {
      icon: "📊",
      title: "Conversion analytics",
      desc: "Track try-on adoption, conversion lift, and return delta from your brand dashboard.",
    },
    {
      icon: "🎨",
      title: "Catalog-aware rendering",
      desc: "Our model understands fabric texture, drape, and fit — not just a flat color overlay.",
    },
    {
      icon: "📱",
      title: "Mobile-first experience",
      desc: "Optimized for the 78% of shoppers who browse on mobile. Fast, smooth, no app required.",
    },
    {
      icon: "🔗",
      title: "Multi-platform support",
      desc: "Shopify, WooCommerce, Magento, and custom storefronts via our REST API and React SDK.",
    },
  ];
  return (
    <section
      id="features"
      style={{
        padding: "100px clamp(1.5rem, 5vw, 3rem)",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Platform
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 64,
              maxWidth: 520,
            }}
          >
            Built for brands that take conversion seriously.
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {features.map(({ icon, title, desc }, idx) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={idx}
                whileHover={{ y: -4, borderColor: "rgba(232,197,71,0.2)" }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "28px 24px",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 14 }}>{icon}</div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#F5F5F0",
                    margin: "0 0 8px",
                    letterSpacing: "-0.4px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(245,245,240,0.5)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInViewAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      quote:
        "Our return rate dropped from 31% to 19% within 60 days of going live. The integration took half a day.",
      name: "Priya Mehta",
      role: "Head of Growth, Loom & Co.",
      avatar: "PM",
    },
    {
      quote:
        "We tried three different AR try-on tools. Fitt is the only one where the results actually looked photorealistic on our customers.",
      name: "Arjun Sinha",
      role: "Co-founder, Thread House",
      avatar: "AS",
    },
    {
      quote:
        "The conversion analytics dashboard alone is worth it. We finally have data on which items people try on and abandon.",
      name: "Swati Rao",
      role: "E-commerce Lead, House of Pret",
      avatar: "SR",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.2px",
              marginBottom: 20,
              maxWidth: 480,
            }}
          >
            What our brands say.
          </motion.h2>

          {/* Dot indicators */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, marginBottom: 40 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: activeIndex === i ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeIndex === i ? "#E8C547" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {testimonials.map(({ quote, name, role, avatar }, idx) => (
              <motion.div
                key={name}
                variants={fadeUp}
                custom={idx}
                animate={{
                  borderColor: activeIndex === idx ? "rgba(232,197,71,0.3)" : "rgba(255,255,255,0.07)",
                  background: activeIndex === idx ? "rgba(232,197,71,0.05)" : "rgba(255,255,255,0.03)",
                }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveIndex(idx)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16,
                  padding: "32px 28px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{ fontSize: 20, color: "#E8C547", marginBottom: 16 }}
                >
                  ❝
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "rgba(245,245,240,0.7)",
                    lineHeight: 1.7,
                    margin: "0 0 28px",
                  }}
                >
                  {quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "rgba(232,197,71,0.15)",
                      border: "1px solid rgba(232,197,71,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#E8C547",
                      }}
                    >
                      {avatar}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#F5F5F0",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "rgba(245,245,240,0.35)",
                      }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  const [ref, inView] = useInViewAnimation();
  const [annual, setAnnual] = useState(false);
  const plans = [
    {
      name: "Pilot",
      price: annual ? "₹7,999" : "₹9,999",
      period: "/month",
      desc: "For brands ready to test try-on on a single product line.",
      highlight: false,
      features: [
        "Up to 500 try-ons/month",
        "1 storefront integration",
        "Shopify & WooCommerce",
        "Basic analytics dashboard",
        "Email support",
        "3-day onboarding",
      ],
      cta: "Start Pilot",
    },
    {
      name: "Growth",
      price: annual ? "₹23,999" : "₹29,999",
      period: "/month",
      desc: "For brands scaling conversion across their full catalog.",
      highlight: true,
      features: [
        "Up to 5,000 try-ons/month",
        "3 storefront integrations",
        "All platforms + REST API",
        "Advanced analytics + return tracking",
        "Priority Slack support",
        "Custom widget branding",
        "A/B testing toolkit",
      ],
      cta: "Get Started",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large catalogs, high traffic, and custom requirements.",
      highlight: false,
      features: [
        "Unlimited try-ons",
        "Unlimited storefronts",
        "Custom model fine-tuning",
        "Dedicated infrastructure",
        "SLA & uptime guarantee",
        "Dedicated success manager",
        "White-label option",
      ],
      cta: "Talk to Sales",
    },
  ];
  return (
    <section
      id="pricing"
      style={{
        padding: "100px clamp(1.5rem, 5vw, 3rem)",
        background: "rgba(255,255,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Pricing
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              marginBottom: 12,
            }}
          >
            Simple, ROI-positive pricing.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(245,245,240,0.45)",
              marginBottom: 32,
              maxWidth: 440,
            }}
          >
            Most brands recover their Fitt subscription cost within the first
            week through reduced returns alone.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 48,
            }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: annual ? "rgba(245,245,240,0.35)" : "#F5F5F0",
              fontWeight: annual ? 400 : 600,
              transition: "all 0.2s",
            }}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                background: annual ? "#E8C547" : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.3s",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <motion.div
                animate={{ x: annual ? 24 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: annual ? "#0A0A0F" : "#F5F5F0",
                  position: "absolute",
                  top: 3,
                }}
              />
            </button>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: annual ? "#F5F5F0" : "rgba(245,245,240,0.35)",
              fontWeight: annual ? 600 : 400,
              transition: "all 0.2s",
            }}>
              Annual
            </span>
            {annual && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#E8C547",
                  background: "rgba(232,197,71,0.1)",
                  padding: "3px 10px",
                  borderRadius: 100,
                  border: "1px solid rgba(232,197,71,0.2)",
                }}
              >
                Save 20%
              </motion.span>
            )}
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {plans.map(
              ({ name, price, period, desc, highlight, features, cta }, idx) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  custom={idx}
                  whileHover={{ y: -6 }}
                  style={{
                    background: highlight
                      ? "rgba(232,197,71,0.07)"
                      : "rgba(255,255,255,0.03)",
                    border: highlight
                      ? "1px solid rgba(232,197,71,0.3)"
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18,
                    padding: "36px 28px",
                    position: "relative",
                    transition: "transform 0.2s",
                  }}
                >
                  {highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#E8C547",
                        borderRadius: 100,
                        padding: "3px 14px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#0A0A0F",
                        }}
                      >
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  <div style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: highlight ? "#E8C547" : "rgba(245,245,240,0.5)",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2.4rem",
                        fontWeight: 700,
                        color: "#F5F5F0",
                        letterSpacing: "-1px",
                      }}
                    >
                      {price}
                    </motion.span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "rgba(245,245,240,0.4)",
                      }}
                    >
                      {period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,245,240,0.45)",
                      lineHeight: 1.6,
                      margin: "0 0 28px",
                    }}
                  >
                    {desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginBottom: 32,
                    }}
                  >
                    {features.map((f) => (
                      <div
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            color: "#E8C547",
                            fontSize: 13,
                            marginTop: 1,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "rgba(245,245,240,0.6)",
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  <motion.a
                    href="#cta"
                    onClick={(e) => { e.preventDefault(); scrollToSection("cta"); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "block",
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      padding: "12px",
                      borderRadius: 10,
                      textDecoration: "none",
                      background: highlight
                        ? "#E8C547"
                        : "rgba(255,255,255,0.06)",
                      color: highlight ? "#0A0A0F" : "rgba(245,245,240,0.75)",
                      border: highlight
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                      transition: "background 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    {cta}
                  </motion.a>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [ref, inView] = useInViewAnimation();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "How complex is the integration?",
      a: "For Shopify, it's a one-click app install. For other platforms, it's a single script tag or a React component. The median integration time across our brands is 2.5 days — no backend changes or engineering sprints required.",
    },
    {
      q: "What happens to the shopper's photo?",
      a: "Shopper photos are processed in-memory on our isolated compute infrastructure and are never stored, logged, or used for any other purpose. We are fully GDPR and India DPDP compliant. We can share our Data Processing Agreement on request.",
    },
    {
      q: "How accurate is the try-on?",
      a: "Fitt uses a photorealistic rendering model trained on fashion-specific data. It correctly handles fabric drape, fit variation across body types, and texture fidelity. It's meaningfully different from flat color overlays or AR markers — which is why it actually impacts return rates.",
    },
    {
      q: "Will it actually reduce my return rates?",
      a: "Across our live brand cohort, the average return rate reduction is 35% for items where try-on is used at checkout. The impact is strongest for tops, dresses, and tailored bottoms — categories where fit uncertainty drives most returns.",
    },
    {
      q: "How long does setup take end-to-end?",
      a: "From signed agreement to live widget: 3 business days on average. Day 1 is access and catalog sync. Day 2 is widget configuration and brand customization. Day 3 is QA, UAT, and go-live. Your team needs to spend maybe 2–3 hours total.",
    },
  ];
  return (
    <section id="faq" style={{ padding: "100px clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#E8C547",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.2px",
              marginBottom: 48,
            }}
          >
            Common questions.
          </motion.h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                  onMouseEnter={(e) => {
                    const span = e.currentTarget.querySelector('.faq-q') as HTMLElement;
                    if (span) span.style.color = "#E8C547";
                  }}
                  onMouseLeave={(e) => {
                    const span = e.currentTarget.querySelector('.faq-q') as HTMLElement;
                    if (span) span.style.color = open === i ? "#E8C547" : "#F5F5F0";
                  }}
                >
                  <span
                    className="faq-q"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: open === i ? "#E8C547" : "#F5F5F0",
                      transition: "color 0.2s",
                    }}
                  >
                    {q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: 20,
                      color: "#E8C547",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 15,
                          color: "rgba(245,245,240,0.55)",
                          lineHeight: 1.75,
                          margin: "0 0 24px",
                          maxWidth: 620,
                        }}
                      >
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, inView] = useInViewAnimation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <section id="cta" style={{ padding: "80px clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            background:
              "linear-gradient(135deg, rgba(232,197,71,0.12) 0%, rgba(240,165,0,0.06) 100%)",
            border: "1px solid rgba(232,197,71,0.2)",
            borderRadius: 24,
            padding: "clamp(40px, 6vw, 72px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,197,71,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F5F5F0",
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
              position: "relative",
            }}
          >
            Ready to convert more, return less?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(245,245,240,0.5)",
              margin: "0 auto 40px",
              maxWidth: 480,
              lineHeight: 1.65,
              position: "relative",
            }}
          >
            Book a 30-minute demo. We'll show Fitt live on your own catalog and
            model out your projected ROI.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  position: "relative",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(232,197,71,0.2)",
                    border: "2px solid #E8C547",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  ✓
                </motion.div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#E8C547",
                }}>
                  Demo request sent!
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(245,245,240,0.5)",
                }}>
                  We'll reach out to {email} within 24 hours.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  maxWidth: 520,
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    padding: "14px 20px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(10,10,15,0.6)",
                    color: "#F5F5F0",
                    flex: "1 1 260px",
                    minWidth: 0,
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(232,197,71,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(232,197,71,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    background: "#E8C547",
                    color: "#0A0A0F",
                    padding: "14px 32px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Book a Demo →
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {!submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "rgba(245,245,240,0.3)",
                marginTop: 16,
                position: "relative",
              }}
            >
              No credit card required • 30-minute call • See ROI projections
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const [year] = useState(new Date().getFullYear());

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", target: "features" },
        { label: "Pricing", target: "pricing" },
        { label: "Demo", target: "demo" },
        { label: "How It Works", target: "how-it-works" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQ", target: "faq" },
        { label: "Testimonials", target: "testimonials" },
        { label: "Blog", target: "hero" },
        { label: "Documentation", target: "hero" },
      ],
    },
  ];

  return (
    <footer
      style={{
        padding: "64px clamp(1.5rem, 5vw, 3rem) 48px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "clamp(24px, 4vw, 60px)",
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: "linear-gradient(135deg, #E8C547, #F0A500)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5V11L8 14L3 11V5L8 2Z" fill="#0A0A0F" />
                  <circle cx="8" cy="8" r="2" fill="#E8C547" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#F5F5F0",
                }}
              >
                Fitt<span style={{ color: "#E8C547" }}>.</span>
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "rgba(245,245,240,0.35)",
              lineHeight: 1.65,
              maxWidth: 300,
              marginBottom: 20,
            }}>
              AI-powered virtual try-on for fashion e-commerce. Convert more, return less.
            </p>
            <a
              href="mailto:hello@fitt.ai"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#E8C547",
                textDecoration: "none",
              }}
            >
              hello@fitt.ai
            </a>
          </div>

          {/* Footer link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(245,245,240,0.5)",
                letterSpacing: "0.5px",
                marginBottom: 16,
              }}>
                {section.title}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.target);
                    }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "rgba(245,245,240,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.65)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.35)")
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(245,245,240,0.2)",
            }}
          >
            © {year} Fitt Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Security"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "rgba(245,245,240,0.3)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(245,245,240,0.3)")
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(232,197,71,0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "rgba(232,197,71,0.15)",
            border: "1px solid rgba(232,197,71,0.3)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#E8C547",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            zIndex: 40,
          }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
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

        /* Desktop: show desktop-nav, hide mobile-only */
        .desktop-nav { display: flex !important; }
        .mobile-only { display: none !important; }

        /* Footer grid */
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; }

        /* Demo grid */
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
