import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../lib/helpers";

const navLinks = [
  { label: "Product", target: "features" },
  { label: "Pricing", target: "pricing" },
  { label: "How It Works", target: "how-it-works" },
  { label: "Demo", target: "demo" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, #E8C547 0%, #F0A500 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L13 5V11L8 14L3 11V5L8 2Z"
                  fill="#0A0A0F"
                  strokeWidth="0"
                />
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
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#F5F5F0")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(245,245,240,0.55)")
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
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 8 }
                    : { rotate: 0, y: 0 }
                }
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
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: "#F5F5F0",
                  borderRadius: 2,
                }}
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0 }
                }
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
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
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
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "rgba(255,255,255,0.05)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "transparent")
                  }
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
